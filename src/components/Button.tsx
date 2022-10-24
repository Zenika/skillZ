import React from "react";

type ButtonProps = {
  type: "primary" | "secondary";
  style: "outlined" | "contained";
  callback: () => void;
  children?: JSX.Element | JSX.Element[] | string | string[];
  icon?: JSX.Element;
  disabled?: boolean;
  uppercase?: boolean;
};

const Button = ({
  type,
  style,
  callback,
  children,
  icon = null,
  uppercase = true,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`${
        type === "primary" && style === "contained" && "gradient-red"
      } ${
        type === "secondary" &&
        style === "contained" &&
        "bg-light-graybutton dark:bg-dark-graybutton"
      } ${style === "outlined" && "bg-transparent border"} ${
        type === "primary" &&
        style === "outlined" &&
        "border-dark-red dark:border-dark-red"
      } ${
        type === "secondary" &&
        style === "outlined" &&
        "border-dark-light dark:border-dark-light"
      } ${uppercase ? "uppercase" : "normal-case"} ${
        style === "outlined" &&
        `text-${type === "primary" ? "dark-red" : "white"}`
      } text-base font-bold py-2 px-5 rounded-full disabled:opacity-25`}
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
