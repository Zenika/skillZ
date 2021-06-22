import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../utils/i18nContext";

export type Skill = {
  id: string;
  name: string;
  skillLevel?: number;
  desireLevel?: number;
};

const INSERT_SKILL_MUTATION = gql`
  mutation insertSkillMutation($name: String!, $categoryId: uuid!) {
    insert_Skill(objects: { name: $name, categoryId: $categoryId }) {
      returning {
        id
        name
      }
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
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  const [insertSkill, { error: mutationError }] = useMutation<{
    insert_Skill: { returning: Skill[] };
  }>(INSERT_SKILL_MUTATION, {
    onCompleted: (response) => {
      if (!response?.insert_Skill?.returning) {
        return;
      }
      action(response?.insert_Skill?.returning[0]);
    },
  });
  const addSkillButtonClick = () => {
    if (!categoryId || !search || search === "") {
      return;
    }
    insertSkill({ variables: { name: search, categoryId } });
  };

  return (
    <div className={`flex flex-col my-4 ${isDesktop ? "overflow-y-auto" : ""}`}>
      {skills && skills.length > 0 ? (
        <div>
          {skills?.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-row justify-between bg-light-light dark:bg-dark-light p-4 my-2 rounded-lg"
            >
              <span className="text-l">{skill.name}</span>
              <button
                onClick={() => action(skill)}
                className="rounded-full border px-2 text-light-red dark:text-dark-red"
              >
                {t("skills.add")}
              </button>
            </div>
          ))}
          {search.length > 0 ? (
            <div className="flex flex-col justify-center px-2 py-4 rounded-lg bg-light-dark dark:bg-dark-dark my-2">
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
                  className="flex flex-row justify-between bg-light-light dark:bg-dark-light p-4 my-2 rounded-lg"
                >
                  <span className="text-l">{skill.name}</span>
                  <button
                    onClick={() => action(skill)}
                    className="rounded-full border px-2 text-light-red dark:text-dark-red"
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
            <div className="flex flex-col justify-center px-2 py-4 rounded-lg bg-light-dark bg-dark-dark my-2">
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
