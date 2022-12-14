import { useEffect, useState } from "react";
import { useDarkMode } from "../../../utils/darkMode";
import styles from "./CustomSelect.module.css";

type CustomSelectProps = {
  choices: any[];
  keyFn: (x: any) => string;
  labelFn: (x: any) => string;
  selectedChoice?: any;
  placeholder: string;
  readOnly?: boolean;
  onChange: (choice: any) => void;
};

const CustomSelect = ({
  keyFn,
  labelFn,
  choices,
  selectedChoice,
  placeholder,
  readOnly = false,
  onChange,
}: CustomSelectProps) => {
  const [opened, setOpened] = useState(false);
  const { darkMode } = useDarkMode();
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    setSelected(selectedChoice);
  }, [selectedChoice]);

  const onItemClick = (value: string) => {
    setSelected(value);
    onChange(value);
    setOpened(false);
  };

  return (
    <div className="w-auto z-10 h-12">
      <div
        className={`bg-light-light dark:bg-dark-light dark:border-dark-light hover:bg-light-dark hover:border-light-graybutton hover:dark:bg-dark-radargrid dark:border-dark-graybutton w-full p-3 appearance-none rounded-lg border border-solid border-light-dark ${
          readOnly ? "" : "cursor-pointer bg-rightDropdown "
        }${
          readOnly ? "" : darkMode ? styles.selectDark : styles.selectLight
        } max-h-16 text-ellipsis overflow-hidden`}
        onClick={() => setOpened(!opened)}
      >
        <span className="">
          {selected !== undefined ? labelFn(selected) : placeholder}
        </span>
      </div>
      <div
        className={`flex flex-row justify-center w-full ${
          opened ? "" : "h-0"
        } duration-500`}
      >
        {!readOnly && opened && (
          <div className="flex w-full flex-col bg-light-light dark:bg-dark-light overflow-y-scroll max-h-96 mt-1 rounded-lg border border-solid border-light-dark dark:border-dark-graybutton">
            {choices.map((choice) => (
              <span
                key={keyFn(choice)}
                className="hover:bg-light-dark hover:dark:bg-dark-radargrid py-2 px-4 cursor-pointer"
                onClick={() => onItemClick(choice)}
              >
                {labelFn(choice)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
