import * as React from "react";

import { cn } from "@/lib/utils";
import { Control, get, useController } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control?: Control<any, any>;
  name: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, control, name, ...props }, ref) => {
    const {
      field,
      formState: { isSubmitting, errors },
    } = useController({
      name,
      control,
    });

    const error: Error = get(errors, name, "");

    return (
      <div>
        <input
          id={name}
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          //ref={ref}
          {...field}
          {...props}
        />
        {error && <>{error.message}</>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
