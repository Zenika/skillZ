import { useContext } from "react";
import Image from "next/image";
import LevelBar from "./LevelBar";
import { Skill } from "../pages/skills/[context]/[category]";
import { i18nContext } from "../utils/i18nContext";
import { useRouter } from "next/router";
import { DarkModeContext } from "../utils/darkModeContext";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!NEXT_PUBLIC_BASE_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_BASE_URL isn't defined"
  );
}

const SkillPanel = ({
  skill,
  context,
  count,
  onEditClick,
}: {
  skill: Skill;
  context: string;
  count?: number;
  onEditClick: (skill: Skill) => void;
}) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useContext(DarkModeContext);
  const { push, query } = useRouter();
  const { category, agency } = query;
  const computedAgency =
    agency && agency !== "World"
      ? typeof agency === "string"
        ? agency
        : agency.join("")
      : undefined;
  const link = new URL(
    `${NEXT_PUBLIC_BASE_URL}/skills/${context}/${category}/${skill.name}`
  );
  if (computedAgency) {
    link.searchParams.append("agency", computedAgency);
  }
  const { id, name, skillLevel, desireLevel, certif } = skill;
  return (
    <div
      className={`flex flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg ${
        context === "zenika" ? "cursor-pointer" : ""
      }`}
      onClick={() => (context === "zenika" ? push(link) : () => {})}
    >
      <div
        className={`flex flex-col ${context !== "zenika" ? "w-5/6" : "w-full"}`}
      >
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">{name}</h2>
          {count || certif ? (
            <div className="flex flex-row justify-around rounded-full w-16 px-1 py-1 bg-light-med dark:bg-dark-med">
              <div className="flex flex-col justify-center">
                <span>{count}</span>
              </div>
              {certif ? (
                <Image
                  src={`/icons/${darkMode ? "dark" : "light"}/certifs.svg`}
                  height="30"
                  width="30"
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">
              {t("skills.desireLevel")}
            </p>
            <LevelBar color="red" level={desireLevel} />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">{t("skills.skillLevel")}</p>
            <LevelBar color="yellow" level={skillLevel} />
          </div>
        </div>
      </div>
      <div
        className="flex w-1/6 justify-end cursor-pointer"
        onClick={() => (context === "zenika" ? () => {} : onEditClick(skill))}
      >
        {context === "zenika" ? (
          <Image
            src={`/icons/${darkMode ? "dark" : "light"}/chevron.svg`}
            width="8"
            height="12"
          />
        ) : (
          <Image
            src={`/icons/${darkMode ? "dark" : "light"}/preferences.svg`}
            width="24"
            height="24"
          />
        )}
      </div>
    </div>
  );
};

export default SkillPanel;
