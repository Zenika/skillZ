import { useContext, useEffect, useRef, useState } from "react";
import { useDarkMode } from "../../utils/darkMode";
import { i18nContext } from "../../utils/i18nContext";

type ViewAgencyProps = {
  agency: string;
};

const ViewAgency = ({ agency }: ViewAgencyProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { darkMode } = useDarkMode();
  const { t } = useContext(i18nContext);
  const ref = useRef(null);
  useEffect(() => {
    setSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    });
  }, [ref]);
  return (
    <div
      className={`flex flex-col justify-around rounded-lg pb-8 my-2 p-2 ${
        darkMode ? "bg-dark-dark" : "bg-light-med"
      }`}
    >
      <div className="p-2 text-xl">{t("userProfile.agency")}</div>
      <div ref={ref} className="w-full h-10">
        <div
          className="z-20 absolute"
          style={{ width: size.width, height: size.height }}
        >
          <div
            className={`bg-light-light dark:bg-dark-light w-full rounded-lg p-4 appearance-none cursor-default`}
          >
            {agency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAgency;
