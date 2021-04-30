import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { i18nContext } from "../utils/i18nContext";

export type Skill = {
  id: string;
  name: string;
  level?: number;
  desire?: number;
};

const INSERT_SKILL_MUTATION = gql`
  mutation insertSkillMutation($name: String!, $categoryId: uuid!) {
    insert_Skill(objects: { name: $name, categoryId: $categoryId }) {
      affected_rows
    }
  }
`;

const AddSkillListSelector = ({
  skills,
  didYouMeanSkills,
  search,
  categoryId,
  action,
}: {
  skills: Skill[];
  didYouMeanSkills: Skill[];
  search: string;
  categoryId: string;
  action: (skill: Skill) => void;
}) => {
  const { t } = useContext(i18nContext);
  const [insertSkill, { error: mutationError }] = useMutation(
    INSERT_SKILL_MUTATION
  );
  const addSkillButtonClick = () => {
    if (!categoryId || !search || search === "") {
      return;
    }
    insertSkill({ variables: { name: search, categoryId } });
    document.location.reload();
  };

  return (
    <div className="flex flex-col my-4">
      {skills && skills.length > 0 ? (
        <div>
          {skills?.map((skill) => (
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
          ))}
          {search.length > 0 ? (
            <div className="flex flex-col justify-center px-2 py-4 rounded-lg bg-dark-dark my-2">
              <span className="p-2 text-center">
                {t("skills.addNewSkill").replace("%skill%", search)}
              </span>
              <button
                className="rounded-full gradient-red text-white py-2"
                onClick={() => addSkillButtonClick()}
              >
                {t("skills.addButton").replace("%skill%", search)}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-around">
          <span className="flex flex-row justify-center my-2">
            {t("skills.noMatchingSkills")}
          </span>
          {didYouMeanSkills && didYouMeanSkills.length > 0 ? (
            <>
              <div className="flex flex-row justify-center my-2">
                <span>{t("skills.didYouMean")}</span>
              </div>
              {didYouMeanSkills?.map((skill) => (
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
              ))}{" "}
            </>
          ) : (
            <></>
          )}
          {search.length > 0 ? (
            <div className="flex flex-col justify-center px-2 py-4 rounded-lg bg-dark-dark my-2">
              <span className="p-2 text-center">
                {t("skills.addNewSkill").replace("%skill%", search)}
              </span>
              <button
                className="rounded-full gradient-red text-white py-2"
                onClick={() => addSkillButtonClick()}
              >
                {t("skills.addButton").replace("%skill%", search)}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default AddSkillListSelector;
