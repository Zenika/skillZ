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
        <div className="flex flex-row items-center">
          <RiErrorWarningFill color="#bf1d67" />
          <p className="text-light-red pl-1">{errorMessage}</p>
        </div>
      )}
      <textarea
        className={`bg-light-light dark:bg-dark-light p-3 appearance-none rounded-lg border border-solid border-${
          error ? "light-red" : "light-dark"
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
