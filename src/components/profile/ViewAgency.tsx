import { useContext, useEffect, useRef, useState } from "react";
import { useDarkMode } from "../../utils/darkMode";
import styles from "../CustomSelect.module.css";
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
      className={`${
        darkMode
          ? "flex flex-col justify-around rounded-lg bg-dark-dark my-2 p-2"
          : "flex flex-col justify-around rounded-lg bg-lidht-med my-2 p-2"
      }`}
    >
      <div className="p-2 text-xl">{t("userProfile.agency")}</div>
      <div ref={ref} className="w-full h-20">
        <div
          className="z-20 absolute"
          style={{ width: size.width, height: size.height }}
        >
          <div
            className={`bg-light-light dark:bg-dark-light w-full cursor-pointer rounded -lg p-4 appearance-none`}
          >
            {agency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAgency;
