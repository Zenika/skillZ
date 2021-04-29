import { useContext } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../utils/i18nContext";
import Radar, { RadarData } from "./Radar";

type PageWithSkillListProps = {
  children: any;
  category: string | string[];
  context: string | string[];
  add: boolean;
  faded?: boolean;
  data?: RadarData[];
  color?: string;
};

const PageWithSkillList = ({
  children,
  category,
  context,
  add,
  faded,
  data,
  color,
}: PageWithSkillListProps) => {
  const { t } = useContext(i18nContext);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });
  return (
    <div className="flex flex-row justify-center mt-4 mb-20">
      <div className="flex flex-row justify-center max-w-screen-lg w-full p-4">
        {isDesktop && data && color ? (
          <div className="flex flex-col h-2/3 w-2/3 px-2">
            <Radar
              data={data}
              color={color}
              x="top"
              y="left"
              title=""
              faded={faded}
            />
          </div>
        ) : (
          <></>
        )}
        <div className={`flex flex-col ${isDesktop ? "w-1/3" : "w-auto"} px-2`}>
          {context !== "zenika" ? (
            <div
              className={`flex flex-row justify-around px-2 py-1 ${
                faded ? "opacity-25" : ""
              }`}
            >
              <Link href={`/skills/${context}/${category}`}>
                <button
                  className={`${
                    add ? `dark:bg-dark-light` : `gradient-red`
                  } flex-grow-0 rounded-full mx-2 py-4 px-8`}
                >
                  {t("skills.mySkills")}
                </button>
              </Link>
              <Link href={`/skills/${context}/${category}/add`}>
                <button
                  className={`${
                    add ? `gradient-red` : `dark:bg-dark-light`
                  } flex-grow-0 rounded-full mx-2 py-4 px-8`}
                >
                  {t("skills.addSkill")}
                </button>
              </Link>
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-col mt-6 max-w-screen-lg min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWithSkillList;
