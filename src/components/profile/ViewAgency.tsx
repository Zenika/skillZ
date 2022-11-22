import { useContext, useEffect, useRef, useState } from "react";
import { i18nContext } from "../../utils/i18nContext";

type ViewAgencyProps = {
  agency: string;
};

const ViewAgency = ({ agency }: ViewAgencyProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { t } = useContext(i18nContext);
  const ref = useRef(null);
  useEffect(() => {
    setSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    });
  }, [ref]);
  return (
    <div className="flex flex-col justify-around rounded-lg dark:bg-dark-dark bg-light-dark pb-6 p-2">
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
