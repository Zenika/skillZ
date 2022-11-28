import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../utils/darkMode";
import { Topic } from "../utils/types";

type AutoCompleteList = {
  choices: any[];
  placeholder: string;
  onChange: (choice: any) => void;
  search: string;
  addCallback: (topic: Topic) => void;
};

const AutoCompleteList = ({
  choices,
  placeholder,
  onChange,
  search = "",
  addCallback,
}: AutoCompleteList) => {
  const [opened, setOpened] = useState(false);
  const { darkMode } = useDarkMode();
  const [selected, setSelected] = useState(undefined);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  console.log("selected", selected);

  console.log("search", search);
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

  console.log("choices", choices);
  return (
    <div ref={ref} className="w-full h-12">
      <div
        className="z-10 absolute"
        style={{ width: size.width, height: size.height }}
      >
        {search.length > 0 && (
          <div className="flex w-full flex-col bg-light-light dark:bg-dark-light overflow-y-scroll max-h-96 mt-1 rounded-lg border border-solid border-light-dark">
            {choices.map((choice) => (
              <div
                className="hover:bg-light-med dark:hover:bg-dark-med py-2 px-4 cursor-pointer"
                onClick={() => onItemClick(choice)}
              >
                {choice}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteList;
