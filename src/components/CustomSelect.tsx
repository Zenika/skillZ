import React, { useEffect, useState } from "react";
import styles from "./CustomSelect.module.css";

type CustomSelectProps = {
  choices: string[];
  selectedChoice: string;
  onChange: (choice: string) => void;
};

const CustomSelect = ({
  choices,
  selectedChoice,
  onChange,
}: CustomSelectProps) => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected(selectedChoice);
  }, [selectedChoice]);
  const onItemClick = (value: string) => {
    setSelected(value);
    onChange(value);
    setOpened(false);
  };
  return (
    <div>
      <div
        className={`dark:bg-dark-light w-full z-20 rounded${
          opened ? "-t-lg" : "-lg"
        } p-4 appearance-none bg-rightDropdown ${styles.select}`}
        onClick={() => setOpened(!opened)}
      >
        {selected}
      </div>
      <div
        className={`flex flex-row justify-center w-full ${
          opened ? "" : "h-0"
        } duration-500`}
      >
        {opened ? (
          <div className="flex rounded-b-lg w-full flex-col bg-dark-light">
            {choices.map((choice) => (
              <span
                key={choice}
                className="hover:bg-dark-med py-2 px-4"
                onClick={() => onItemClick(choice)}
              >
                {choice}
              </span>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
