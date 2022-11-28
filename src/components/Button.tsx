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
}: ButtonProps) => {
  return (
    <button
      className={`${
        type === "primary" &&
        style === "contained" &&
        `text-light-ultrawhite gradient-${
          color && color.length > 0 ? color : "red"
        } hover:drop-shadow-xl hover:dark:shadow-lg hover:dark:shadow-dark-radargrid`
      } ${
        type === "secondary" &&
        style === "contained" &&
        "bg-light-graybutton hover:bg-light-radargrid dark:bg-dark-graybutton dark:hover:bg-dark-radargrid"
      } ${style === "outlined" && "bg-transparent border"} ${
        type === "primary" &&
        style === "outlined" &&
        "border-dark-red dark:border-dark-red hover:bg-light-red hover:text-light-light"
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
      } px-5 rounded-full ${
        !visible && "disabled:opacity-25 disabled:pointer-events-none"
      } ${
        style === "contained" &&
        type === "tertiary" &&
        `text-light-ultrawhite gradient-${
          color && color.length > 0 ? color : "red"
        } hover:drop-shadow-xl hover:dark:shadow-lg hover:dark:shadow-dark-radargrid`
      } ${
        style === "faded" &&
        type === "tertiary" &&
        `gradient-${
          color && color.length > 0 ? color : "red"
        }-faded text-light-ultrawhite hover:shadow-xl hover:shadow-light-graybutton hover:dark:shadow-lg hover:dark:shadow-dark-radargrid`
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
