import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { i18nContext } from "../utils/i18nContext";

type PageWithSkillListProps = {
  children: any;
  category: string | string[];
  context: string | string[];
  add: boolean;
  faded?: boolean;
};

const PageWithSkillList = ({
  children,
  category,
  context,
  add,
  faded,
}: PageWithSkillListProps) => {
  const { t } = useContext(i18nContext);
  return (
    <div className="flex flex-row justify-center">
      <div className="max-w-screen-lg w-full">
        <div className="flex flex-col justify-center dark:bg-dark-med max-w-screen-lg">
          <div
            className={`flex flex-row p-6 dark:bg-dark-dark ${
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
          <div className="flex flex-col h-screen p-4">
            <div
              className={`flex flex-row justify-around px-2 py-1 ${
                faded ? "opacity-25" : ""
              }`}
            >
              <Link href={`/skills/${context}/${category}`}>
                <button
                  className={`${
                    add ? `dark:bg-dark-light` : `gradient-red`
                  } flex-grow-0 rounded-full py-4 px-8`}
                >
                  {t("skills.mySkills")}
                </button>
              </Link>
              <Link href={`/skills/${context}/${category}/add`}>
                <button
                  className={`${
                    add ? `gradient-red` : `dark:bg-dark-light`
                  } flex-grow-0 rounded-full py-4 px-8`}
                >
                  {t("skills.addSkill")}
                </button>
              </Link>
            </div>
            <div className="flex flex-col mt-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWithSkillList;
