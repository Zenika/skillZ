import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";

type TextAreaProps = {
  error: boolean;
  callback?: (e: any) => void;
  value: string;
  errorMessage: string;
  rows: number;
  name: string;
};

export const textAreaClasses = {
  textarea: {
    base: "bg-light-light p-3 appearance-none rounded-lg border border-solid",
    dark: "dark:bg-dark-light",
    error: "border-light-red",
    noError: "border-light-dark",
  },
  parent: {
    base: "flex flex-col mt-4 mb-4",
  },
  error: {
    parent: "flex flex-row items-center",
    base: "text-light-red pl-1",
  },
};

const TextArea = ({
  error,
  callback,
  value,
  errorMessage,
  rows,
  name,
}: TextAreaProps) => {
  return (
    <div className="flex flex-col mt-4 mb-4">
      {error && (
        <div className={`${textAreaClasses.error.parent}`}>
          <RiErrorWarningFill color="#bf1d67" />
          <p className={`${textAreaClasses.error.base}`}>{errorMessage}</p>
        </div>
      )}
      <textarea
        className={`${textAreaClasses.textarea.base} ${
          textAreaClasses.textarea.dark
        } ${
          error
            ? textAreaClasses.textarea.error
            : textAreaClasses.textarea.noError
        }`}
        rows={rows}
        name={name}
        value={value}
        onChange={(e) => {
          callback(e.target.value);
        }}
      ></textarea>
    </div>
  );
};

export default TextArea;
