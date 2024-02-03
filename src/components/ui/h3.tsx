import React from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: string;
};

export function H3({ children, ...props }: Props) {
  return (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h3>
  );
}
