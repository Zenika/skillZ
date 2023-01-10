import { useEffect, useRef, useState } from "react";
import { VscAdd } from "react-icons/vsc";

type AutoCompleteList = {
  choices: any[];
  onChange: (choice: any, addNew: boolean) => void;
  search: string;
  newType: string;
};

export const autoCompleteListChildrenClasses = {
  base: "py-2 px-4 cursor-pointer",
  hover: "hover:bg-light-med",
  dark: "dark:hover:bg-dark-med",
};

export const autoCompleteListParentChildrenClasses = {
  base: "flex w-full flex-col bg-light-light overflow-y-scroll max-h-96 mt-1 rounded-lg border border-solid border-light-dark",
  dark: "dark:bg-dark-light",
};

const AutoCompleteList = ({
  choices,
  onChange,
  search = "",
  newType,
}: AutoCompleteList) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  useEffect(() => {
    setSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    });
  }, [ref]);

  return (
    <div
      ref={ref}
      className="w-full h-12"
      style={{ width: size.width, height: size.height }}
      data-testid={"autocompletelist"}
    >
      <div className={`${autoCompleteListParentChildrenClasses.base} ${autoCompleteListParentChildrenClasses.dark}`}>
        {search && (
          <div
            className="flex flex-row leading-6 hover:bg-light-med dark:hover:bg-dark-med py-2 px-4 cursor-pointer"
            onClick={() => onChange(search, true)}
          >
            <div className="flex flex-col justify-evenly pr-2">
              <VscAdd />
            </div>
            <p className="pr-2">{newType}</p>
            <p className="opacity-50">{search}</p>
          </div>
        )}
        {search && choices && (
          <>
            {choices.map((choice, i) => (
              <div
                className={`${autoCompleteListChildrenClasses.base} ${autoCompleteListChildrenClasses.hover} ${autoCompleteListChildrenClasses.dark}`}
                onClick={() => onChange(choice, false)}
                key={i}
              >
                {choice}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteList;
