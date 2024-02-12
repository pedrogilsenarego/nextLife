import { cn } from "@/lib/utils";
import React from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: string;
};

export function H3({ children, className, ...props }: Props) {
  return (
    <h3
      className={cn(className, "text-2xl font-semibold tracking-tight")}
      {...props}
    >
      {children}
    </h3>
  );
}
