import { useEffect, useRef, useState, useContext } from "react";
import { i18nContext } from "../../utils/i18nContext";
import { VscAdd } from "react-icons/vsc";

type AutoCompleteList = {
  choices: any[];
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
  const { t } = useContext(i18nContext);

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
        <div className="flex w-full flex-col bg-light-light dark:bg-dark-light overflow-y-scroll max-h-96 mt-1 rounded-lg border border-solid border-light-dark">
          {search && (
            <div className="flex flex-row leading-6 hover:bg-light-med dark:hover:bg-dark-med py-2 px-4 cursor-pointer">
              <div className="flex flex-col justify-evenly pr-4">
                <VscAdd />
              </div>
              <p className="opacity-50 pr-2">{t("skills.tags.create")}</p>
              <div>{search}</div>
            </div>
          )}
          {search && choices && (
            <>
              {choices.map((choice, i) => (
                <div
                  className="hover:bg-light-med dark:hover:bg-dark-med py-2 px-4 cursor-pointer"
                  onClick={() => onChange(choice)}
                  key={i}
                >
                  {choice}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteList;
