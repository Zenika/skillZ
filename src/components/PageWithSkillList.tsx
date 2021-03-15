import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { i18nContext } from "../utils/i18nContext";

const PageWithSkillList = ({ children, category, context, add }) => {
  const { t } = useContext(i18nContext);
  return (
    <div className="flex flex-col dark:bg-dark-med">
      <div className="flex flex-row p-6 dark:bg-dark-dark">
        <Link href="/">
          <div className="p-1">
            <Image src="/icons/back-arrow.svg" width="16" height="16" />
          </div>
        </Link>
        <h1 className="ml-10 text-xl">{t(`home.${category}`)}</h1>
      </div>
      <div className="flex flex-col h-screen p-4">
        <div className="flex flex-row justify-around px-2 py-1">
          <Link href={`/skills/${context}/${category}`}>
            <button
              className={`${
                add ? `dark:bg-dark-light` : `gradient-red`
              } flex-grow-0 rounded-full py-4 px-8`}
            >
              MY SKILLS
            </button>
          </Link>
          <Link href={`/skills/${context}/${category}/add`}>
            <button
              className={`${
                add ? `gradient-red` : `dark:bg-dark-light`
              } flex-grow-0 rounded-full py-4 px-8`}
            >
              ADD SKILL
            </button>
          </Link>
        </div>
        <div className="flex flex-col mt-6">{children}</div>
      </div>
    </div>
  );
};

export default PageWithSkillList;
