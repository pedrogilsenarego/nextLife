import { cn } from "@/lib/utils";
import React from "react";
type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: string | string[] | number;
};

export function P({ children, className, ...props }: Props) {
  return (
    <p className={cn("", className)} {...props}>
      {children}
    </p>
  );
}
