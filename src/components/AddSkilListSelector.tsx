import React, { useContext } from "react";
import { i18nContext } from "../utils/i18nContext";

export type Skill = {
  id: string;
  name: string;
  level?: number;
  desire?: number;
};

const AddSkillListSelector = ({
  skills,
  action,
}: {
  skills: Skill[];
  action: (skill: Skill) => void;
}) => {
  const { t } = useContext(i18nContext);
  return (
    <div className="flex flex-col my-4">
      {skills && skills.length > 0 ? (
        skills?.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-row justify-between dark:bg-dark-light p-4 my-2 rounded-lg"
          >
            <span className="text-l">{skill.name}</span>
            <button
              onClick={() => action(skill)}
              className="rounded-full border px-2 dark:text-dark-red"
            >
              {t("skills.add")}
            </button>
          </div>
        ))
      ) : (
        <div>{t("skills.noSkillYet")}</div>
      )}
    </div>
  );
};

export default AddSkillListSelector;
