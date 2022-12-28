import { useEffect, useRef, useState } from "react";
import { VscAdd } from "react-icons/vsc";

type AutoCompleteList = {
  choices: any[];
  onChange: (choice: any, addNew: boolean) => void;
  search: string;
  newType: string;
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
      className="w-full h-12 z-10"
      style={{ width: size.width, height: size.height }}
    >
      <div className="flex w-full flex-col bg-light-light dark:bg-dark-light overflow-y-scroll max-h-96 mt-1 rounded-lg border border-solid border-light-dark">
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
                className="hover:bg-light-med dark:hover:bg-dark-med py-2 px-4 cursor-pointer"
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
