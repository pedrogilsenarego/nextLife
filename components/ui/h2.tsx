import { cn } from "@/lib/utils";
import React from "react";
type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: string;
};

export function H2({ children, className, ...props }: Props) {
  return (
    <h2
      className={cn(
        "text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
