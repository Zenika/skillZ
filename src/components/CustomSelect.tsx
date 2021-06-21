import { useContext, useEffect, useRef, useState } from "react";
import { DarkModeContext } from "../utils/darkModeContext";
import styles from "./CustomSelect.module.css";

type CustomSelectProps = {
  choices: string[];
  selectedChoice?: string;
  placeholder: string;
  onChange: (choice: string) => void;
};

const CustomSelect = ({
  choices,
  selectedChoice,
  placeholder,
  onChange,
}: CustomSelectProps) => {
  const [opened, setOpened] = useState(false);
  const { darkMode } = useContext(DarkModeContext);
  const [selected, setSelected] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef(null);
  useEffect(() => {
    setSelected(selectedChoice || placeholder);
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
    <div ref={ref} className="w-full h-20">
      <div
        className="z-20 absolute"
        style={{ width: size.width, height: size.height }}
      >
        <div
          className={`bg-light-light dark:bg-dark-light w-full cursor-pointer rounded${
            opened ? "-t-lg" : "-lg"
          } p-4 appearance-none bg-rightDropdown ${
            darkMode ? styles.selectDark : styles.selectLight
          }`}
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
            <div className="flex rounded-b-lg w-full flex-col bg-light-light dark:bg-dark-light">
              {choices.map((choice) => (
                <span
                  key={choice}
                  className="hover:bg-light-med dark:hover:bg-dark-med py-2 px-4 cursor-pointer"
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
    </div>
  );
};

export default CustomSelect;
