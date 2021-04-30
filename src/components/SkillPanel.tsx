import { useContext } from "react";
import Image from "next/image";
import LevelBar from "./LevelBar";
import { Skill } from "../pages/skills/[context]/[category]";
import { i18nContext } from "../utils/i18nContext";
import { useRouter } from "next/router";

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
  const { push, query } = useRouter();
  const { category } = query;
  const { id, name, level, desire, certif } = skill;
  return (
    <div
      className="flex flex-row dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg"
      onClick={() =>
        context === "zenika"
          ? push(`/skills/${context}/${category}/${skill.name}`)
          : () => {}
      }
    >
      <div
        className={`flex flex-col ${context !== "zenika" ? "w-5/6" : "w-full"}`}
      >
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">{name}</h2>
          {count || certif ? (
            <div className="flex flex-row justify-around rounded-full w-16 px-1 py-1 bg-dark-med">
              <div className="flex flex-col justify-center">
                <span>{count}</span>
              </div>
              {certif ? (
                <Image src="/icons/certifs.svg" height="30" width="30" />
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
            <LevelBar color="red" name={name} level={desire} />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">{t("skills.skillLevel")}</p>
            <LevelBar color="yellow" name={name} level={level} />
          </div>
        </div>
      </div>
      <div
        className="flex w-1/6 justify-end"
        onClick={() => (context === "zenika" ? () => {} : onEditClick(skill))}
      >
        {context === "zenika" ? (
          <Image src="/icons/chevron.svg" width="8" height="12" />
        ) : (
          <Image src="/icons/preferences.svg" width="24" height="24" />
        )}
      </div>
    </div>
  );
};

export default SkillPanel;
