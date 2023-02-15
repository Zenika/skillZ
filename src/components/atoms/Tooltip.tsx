import React from "react";

export type TooltipProps = {
  message: string;
  children: React.ReactNode | React.ReactNode[];
};

export function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="group flex">
      {children}
      <span className="absolute scale-0 transition-all rounded bg-light-dark p-2 text-xs text-white group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}
