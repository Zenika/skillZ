import React, { useState } from "react";
import { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

type ChipProps = {
  type: "primary" | "secondary" | "tertiary";
  style: "outlined" | "contained" | "faded";
  callback?: () => void;
  children?: JSX.Element | JSX.Element[] | string | string[];
};

const Chip = ({ type, style, callback, children }: ChipProps) => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [borderColor, setBorderColor] = useState("");

  useEffect(() => {
    if (type === "primary") {
      if (style === "contained") {
        setBackgroundColor("gradient-red");
        setTextColor("text-light-dark");
      } else if ("outlined") {
        setTextColor("text-dark-red");
        setBorderColor(
          "bg-transparent border border-dark-red dark:border-dark-red"
        );
      } else setTextColor("text-white");
    } else if (type === "secondary") {
      if (style === "contained")
        setBackgroundColor("bg-light-graybutton dark:bg-dark-graybutton");
      else if (style === "outlined")
        setBorderColor("border-dark-light dark:border-dark-light");
    } else if (type === "tertiary") {
      if (style === "contained") {
        setTextColor("text-light-dark");
        setBackgroundColor("gradient-red");
      } else if (style === "faded") {
        setBackgroundColor("gradient-red-faded");
      }
    }
  }, [style, type]);

  return (
    <div
      className={`text-base px-4 py-1 my-1 rounded-full uppercase ${backgroundColor} ${borderColor} ${textColor} flex`}
    >
      <div className="flex-row flex-wrap flex justify-center align-middle items-center gap-2">
        {children}
      </div>
      <button
        className="flex justify-center items-center pl-4"
        onClick={callback}
      >
        <IoIosCloseCircle size={20} />
      </button>
    </div>
  );
};

export default Chip;
