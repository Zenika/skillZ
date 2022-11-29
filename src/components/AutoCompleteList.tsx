import { useEffect, useRef, useState } from "react";

type AutoCompleteList = {
  choices: any[];
  placeholder: string;
  onChange: (choice: any) => void;
  search: string;
};

const AutoCompleteList = ({
  choices,
  onChange,
  search = "",
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
    <div ref={ref} className="w-full h-12">
      <div
        className="z-10 absolute"
        style={{ width: size.width, height: size.height }}
      >
        {search.length > 0 && (
          <div className="flex w-full flex-col bg-light-light dark:bg-dark-light overflow-y-scroll max-h-96 mt-1 rounded-lg border border-solid border-light-dark">
            {choices.map((choice, i) => (
              <div
                className="hover:bg-light-med dark:hover:bg-dark-med py-2 px-4 cursor-pointer"
                onClick={() => onChange(choice)}
                key={i}
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
