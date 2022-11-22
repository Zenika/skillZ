import React from "react";

type ButtonProps = {
  type: "primary" | "secondary" | "tertiary";
  style: "outlined" | "contained" | "faded";
  callback?: () => void;
  children?: JSX.Element | JSX.Element[] | string | string[];
  icon?: JSX.Element;
  visible?: boolean;
  disabled?: boolean;
  uppercase?: boolean;
  color?: string;
  chip?: boolean;
};

const Button = ({
  type,
  style,
  callback,
  children,
  icon = null,
  uppercase = true,
  visible = false,
  disabled = false,
  color,
  chip = false,
}: ButtonProps) => {
  return (
    <button
      className={`${
        type === "primary" &&
        style === "contained" &&
        `gradient-${color && color.length > 0 ? color : "red"}`
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
        style === "contained" &&
        (type === "primary" || type === "tertiary") &&
        "text-light-dark"
      } ${
        style === "outlined" &&
        `text-${type === "primary" ? "dark-red" : "white"}`
      } text-base ${style != "faded" && "font-bold"} py-${
        type === "tertiary" ? "1" : "2"
      } px-5 rounded-full ${!visible && "disabled:opacity-25"} ${
        style === "contained" &&
        type === "tertiary" &&
        `gradient-${color && color.length > 0 ? color : "red"}`
      } ${
        style === "faded" &&
        type === "tertiary" &&
        `gradient-${color && color.length > 0 ? color : "red"}-faded`
      }`}
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
