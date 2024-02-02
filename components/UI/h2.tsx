import React from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: string;
};

export function H2({ children, ...props }: Props) {
  return (
    <h2
      className="scroll-m-20 border-b text-slate-400 pb-2 text-3xl font-semibold tracking-tight first:mt-0"
      {...props}
    >
      {children}
    </h2>
  );
}
