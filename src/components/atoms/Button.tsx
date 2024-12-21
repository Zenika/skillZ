import clsx from "clsx";
import React, { type JSX } from "react";

export type ButtonType = "primary" | "secondary" | "tertiary" | "faded";

export interface ButtonProps {
  type: ButtonType;
  callback?: () => void;
  children?: JSX.Element | JSX.Element[] | string | string[];
  icon?: JSX.Element;
  uppercase?: boolean;
  disabled?: boolean;
}

export const buttonTypeClasses: Record<ButtonType, string> = {
  primary:
    "text-light-ultrawhite gradient-red hover:drop-shadow-xl hover:dark:shadow-lg hover:dark:shadow-dark-radargrid",
  secondary:
    "text-dark-red bg-transparent border border-dark-red dark:border-dark-red hover:bg-light-red hover:text-light-light",
  tertiary:
    "bg-light-graybutton hover:bg-light-radargrid dark:bg-dark-graybutton dark:hover:bg-dark-radargrid",
  faded:
    "gradient-red-faded text-light-ultrawhite hover:shadow-xl hover:shadow-light-graybutton hover:dark:shadow-lg hover:dark:shadow-dark-radargrid",
};

export const buttonClasses = {
  base: "text-base font-bold py-2 px-5 rounded-full",
  disabled: "disabled:opacity-25 disabled:pointer-events-none",
  uppercase: "uppercase",
  variant: buttonTypeClasses,
};

const Button = ({
  type,
  callback,
  children,
  icon = null,
  uppercase = true,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        `${buttonClasses.base} ${buttonClasses.disabled} ${
          uppercase && buttonClasses.uppercase
        } ${buttonClasses.variant[type]}`
      )}
      disabled={disabled}
      onClick={callback}
    >
      {!icon && children}
      {icon && (
        <div
          className={
            "flex flex-row justify-center align-middle items-center gap-2"
          }
        >
          {icon}
          {children}
        </div>
      )}
    </button>
  );
};

export default Button;
