import React, { useState } from "react";

type ChipProps = {
  type: "primary" | "secondary" | "tertiary";
  style: "outlined" | "contained" | "faded";
  callback?: () => void;
  children?: JSX.Element | JSX.Element[] | string | string[];
  uppercase?: boolean;
};

const Chip = ({
  type,
  style,
  callback,
  children,
  uppercase = true,
}: ChipProps) => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [borderColor, setBorderColor] = useState("");

  if (type === "primary") {
    if (style === "contained") {
      setBackgroundColor("gradient-red");
      setTextColor("text-light-dark");
    } else if ("outlined") {
      setTextColor("text-dark-red");
      setBorderColor("border-dark-red dark:border-dark-red");
    } else setTextColor("text-white");
  } else if (type === "secondary") {
    if (style === "contained")
      setBackgroundColor("bg-light-graybutton dark:bg-dark-graybutton");
    else if (style === "outlined")
      setBorderColor("border-dark-light dark:border-dark-light");
  } else if (type === "tertiary") {
    if (style === "contained") setTextColor("text-light-dark");
  }

  setTextColor(textColor + "text-base");
  if (style === "faded") {
    setTextColor(textColor + "font-bold");
  }

  return <div></div>;
};

export default Chip;
