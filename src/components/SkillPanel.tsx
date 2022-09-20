import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AiFillEye } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { config } from "../env";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import LevelBar from "./LevelBar";

type Skill = {
  name?: string | null | undefined;
  userCount?: any | null | undefined;
  id?: any | null | undefined;
  skillLevel?: any | null | undefined;
  desireLevel?: any | null | undefined;
  UserSkillDesires?: any | null;
};

const SkillPanel = ({
  skill,
  context,
  count,
  categoryLabel,
  onEditClick,
}: {
  skill: Skill;
  context: string;
  count?: number;
  categoryLabel: string;
  onEditClick?: (skill: Skill) => void;
}) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const { push, query } = useRouter();
  const { agency } = query;
  const computedAgency =
    agency && agency !== "World"
      ? typeof agency === "string"
        ? agency
        : agency.join("")
      : undefined;

  const link = new URL(
    `${config.nextPublicBaseUrl}/skills/${encodeURIComponent(
      context
    )}/${encodeURIComponent(categoryLabel)}/${encodeURIComponent(skill.name)}/`
  );
  if (computedAgency) {
    link.searchParams.append("agency", computedAgency);
  }
  // Placeholder
  const certif = false;
  return (
    <div
      className={`flex flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg items-center`}
    >
      <div
        className={`flex flex-col ${context !== "zenika" ? "w-5/6" : "w-full"}`}
      >
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">{skill.name}</h2>
          {(count || certif) && (
            <div className="flex flex-row justify-around rounded-full w-16 px-1 py-1 bg-light-med dark:bg-dark-med">
              <div className="flex flex-col justify-center">
                <span>{count}</span>
              </div>
              {certif && (
                <Image
                  src={`/icons/${darkMode ? "dark" : "light"}/certifs.svg`}
                  height="30"
                  width="30"
                />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">
              {t("skills.desireLevel")}
            </p>
            <LevelBar
              color="red"
              level={
                skill.desireLevel
                  ? skill.desireLevel
                  : skill.UserSkillDesires?.length > 0
                  ? skill.UserSkillDesires[0].desireLevel
                  : 0
              }
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">{t("skills.skillLevel")}</p>
            <LevelBar
              color="yellow"
              level={
                skill.skillLevel
                  ? skill.skillLevel
                  : skill.UserSkillDesires?.length > 0
                  ? skill.UserSkillDesires[0].skillLevel
                  : 0
              }
            />
          </div>
        </div>
      </div>
      {onEditClick && (
        <div
          className="flex w-1/6 justify-end cursor-pointer"
          onClick={() => onEditClick(skill)}
        >
          <VscSettings size={20} />
        </div>
      )}
      {context === "zenika" && (
        <div
          className="flex w-1/6 justify-end cursor-pointer"
          onClick={() => push(link)}
        >
          <AiFillEye size={20} />
        </div>
      )}
    </div>
  );
};

export default SkillPanel;
