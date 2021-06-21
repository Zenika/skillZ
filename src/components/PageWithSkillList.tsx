import { useContext } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../utils/i18nContext";
import Radar, { RadarData } from "./Radar";
import FilterByPanel, { Filter } from "./FilterByPanel";

type PageWithSkillListProps = {
  children: any;
  category: string | string[];
  context: string | string[];
  add: boolean;
  filters?: Filter[];
  faded?: boolean;
  data?: RadarData[];
  color?: string;
};

const PageWithSkillList = ({
  children,
  category,
  context,
  add,
  filters,
  faded,
  data,
  color,
}: PageWithSkillListProps) => {
  const { t } = useContext(i18nContext);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  return (
    <div className="flex flex-row justify-center mt-4 mb-20">
      <div className="flex flex-row justify-center max-w-screen-xl w-full p-4">
        <div className="flex flex-col w-full">
          {filters ? (
            <div className="mx-4">
              <FilterByPanel filters={filters} />
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-row justify-center w-full">
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
            <div
              className={`flex flex-col ${isDesktop ? "w-1/3" : "w-full"} px-2`}
            >
              {context !== "zenika" ? (
                <div
                  className={`flex flex-row justify-around px-2 py-1 ${
                    faded ? "opacity-25" : ""
                  }`}
                >
                  <Link href={`/skills/${context}/${category}`}>
                    <button
                      className={`${
                        add
                          ? `bg-light-light dark:bg-dark-light`
                          : `gradient-red`
                      } flex-grow-0 rounded-full mx-2 py-4 px-6 cursor-pointer`}
                    >
                      {t("skills.mySkills")}
                    </button>
                  </Link>
                  <Link href={`/skills/${context}/${category}/add`}>
                    <button
                      className={`${
                        add
                          ? `gradient-red`
                          : `bg-light-light dark:bg-dark-light`
                      } flex-grow-0 rounded-full mx-2 py-4 px-6 cursor-pointer`}
                    >
                      {t("skills.addSkill")}
                    </button>
                  </Link>
                </div>
              ) : (
                <></>
              )}
              <div className="flex flex-col mt-6 max-w-screen-xl min-h-screen">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWithSkillList;
