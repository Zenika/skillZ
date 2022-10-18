import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import {
  GetAllVerifiedSkillsQuery,
  InsertSkillMutationMutation,
  Skill,
} from "../generated/graphql";
import { INSERT_SKILL_MUTATION } from "../graphql/mutations/skills";
import { displayNotification } from "../utils/displayNotification";
import { i18nContext } from "../utils/i18nContext";
import { GET_ALL_SKILLS } from "../graphql/queries/skills";
import Loading from "./Loading";

const AddSkillListSelector = ({
  skills,
  didYouMeanSkills,
  search,
  categoryId,
  action,
}: {
  skills: Partial<Skill>[];
  didYouMeanSkills: Partial<Skill>[];
  search: string;
  categoryId: string;
  action: (skill: Partial<Skill>) => void;
}) => {
  const { t } = useContext(i18nContext);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  /*
   * MUTATIONS
   */
  const [insertSkill] = useMutation<InsertSkillMutationMutation>(
    INSERT_SKILL_MUTATION
  );

  /*
   * QUERIES
   */
  const {
    data: verifiedSkills,
    loading: loadingVerifiedSkills,
    error: errorVerifiedSkills,
  } = useQuery<GetAllVerifiedSkillsQuery>(GET_ALL_SKILLS, {
    fetchPolicy: "network-only",
  });

  //MG_DUPPLICATED_SKILL
  const addSkillButtonClick = async () => {
    if (!categoryId || !search || search === "") {
      return;
    }
    const findDuplicatedSkill = verifiedSkills?.Skill.find(
      (skill) => skill.name.toUpperCase() === search.toUpperCase()
    );

    if (findDuplicatedSkill) {
      displayNotification(`${t("error.insertSkillError")}`, "red", 5000);
      return;
    }
    await insertSkill({ variables: { name: search, categoryId } })
      .then((response) => {
        if (!response.data.insert_Skill?.returning) {
          return;
        }
        action(response.data.insert_Skill?.returning[0]);
      })
      .catch(({ graphQLErrors }) => {
        if (graphQLErrors) {
          displayNotification(`${t("error.insertSkillError")}`, "red", 5000);
        } else {
          displayNotification(`${t("error.unknown")}`, "red", 5000);
        }
      });
  };

  if (!skills || loadingVerifiedSkills) return <Loading></Loading>;

  return (
    <div className={`flex flex-col my-4 ${isDesktop ? "overflow-y-auto" : ""}`}>
      {skills && skills.length > 0 && (
        <div className="flex flex-col gap-y-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={
                "flex flex-col justify-center items-center p-4 mx-0.5 bg-light-light dark:bg-dark-light rounded-lg"
              }
            >
              <div className="flex flex-row justify-between w-full items-center">
                <span className="text-l">{skill.name}</span>
                <button
                  onClick={() => action(skill)}
                  className="rounded-full border px-2 text-light-red dark:text-dark-red h-8"
                >
                  {t("skills.add")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {skills && !skills.length && (
        <div className="flex flex-col justify-around">
          <span className="flex flex-row justify-center my-2">
            {t("skills.noMatchingSkills")}
          </span>
          {didYouMeanSkills && didYouMeanSkills.length > 0 && (
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
                    className="rounded-full border px-2 text-light-red dark:text-dark-red h-6"
                  >
                    {t("skills.add")}
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      {search.length > 0 && (
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
      )}
    </div>
  );
};

export default AddSkillListSelector;
