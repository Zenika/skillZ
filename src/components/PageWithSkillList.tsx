import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../utils/i18nContext";
import Topbar from "./Topbar";
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
    <div className="flex flex-row justify-center w-full overflow-y-hidden">
      <div className="flex flex-col w-full">
        {isDesktop ? (
          <div className={faded ? "opacity-25" : ""}>
            <Topbar path={""} togglePanel={() => {}} />
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center dark:bg-dark-med w-full">
            <div className="flex flex-row justify-center w-full my-1 dark:bg-dark-dark">
              <div
                className={`flex flex-row max-w-screen-lg w-full p-6 ${
                  faded ? "opacity-25" : ""
                }`}
              >
                <Link href="/">
                  <div className="p-1">
                    <Image src="/icons/back-arrow.svg" width="16" height="16" />
                  </div>
                </Link>
                <h1 className="ml-10 text-xl">{t(`home.${category}`)}</h1>
              </div>
            </div>
            <div className="flex flex-row justify-center mt-4 mb-20">
              <div className="flex flex-row justify-center max-w-screen-lg w-full  p-4">
                {isDesktop && data && color ? (
                  <div className="flex flex-col h-2/3 w-2/3 px-2">
                    <Radar
                      data={data}
                      color={color}
                      x="top"
                      y="left"
                      title=""
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex flex-col w-auto px-2">
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
                  <div className="flex flex-col mt-6 max-w-screen-lg">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWithSkillList;
