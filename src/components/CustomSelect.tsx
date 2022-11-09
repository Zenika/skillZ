import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../utils/darkMode";
import styles from "./CustomSelect.module.css";

type CustomSelectProps = {
  choices: any[];
  keyFn: (x: any) => string; // eslint-disable-line no-unused-vars
  labelFn: (x: any) => string; // eslint-disable-line no-unused-vars
  selectedChoice?: any;
  placeholder: string;
  readOnly?: boolean;
  onChange: (choice: any) => void; // eslint-disable-line no-unused-vars
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
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  useEffect(() => {
    setSelected(selectedChoice);
  }, [selectedChoice]);

  const onItemClick = (value: string) => {
    setSelected(value);
    onChange(value);
    setOpened(false);
  };

  useEffect(() => {
    setSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    });
  }, [ref]);

  return (
    <div ref={ref} className="w-full h-12">
      <div
        className="z-20 absolute"
        style={{ width: size.width, height: size.height }}
      >
        <div
          className={`bg-light-light dark:bg-dark-light w-full p-3 appearance-none rounded-lg border border-solid border-light-dark ${
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
            <div className="flex w-full flex-col bg-light-light dark:bg-dark-light overflow-y-scroll max-h-96 mt-1 rounded-lg border border-solid border-light-dark">
              {choices.map((choice) => (
                <span
                  key={keyFn(choice)}
                  className="hover:bg-light-med dark:hover:bg-dark-med py-2 px-4 cursor-pointer"
                  onClick={() => onItemClick(choice)}
                >
                  {labelFn(choice)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
