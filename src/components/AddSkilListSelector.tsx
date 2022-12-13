import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { InsertSkillMutationMutation, Skill } from "../generated/graphql";
import { INSERT_SKILL_MUTATION } from "../graphql/mutations/skills";
import { displayNotification } from "../utils/displayNotification";
import { i18nContext } from "../utils/i18nContext";
import Button from "./Button";
import Modal from "./Modal";
import SkillDetails from "./SkillDetails";

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
  const [openSkillDetails, setOpenSkillDetails] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const closeModal = () => {
    setOpenSkillDetails(false);
  };

  const selectSkill = (skill: Partial<Skill>) => {
    setSelectedSkill(skill);
    setOpenSkillDetails(true);
  };

  /*
   * MUTATIONS
   */
  const [insertSkill] = useMutation<InsertSkillMutationMutation>(
    INSERT_SKILL_MUTATION
  );

  const addSkillButtonClick = async () => {
    if (!categoryId || !search || search === "") {
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

  if (!skills) return <></>;

  return (
    <div className={`flex flex-col my-4 ${isDesktop ? "overflow-y-auto" : ""}`}>
      {skills && skills.length > 0 && (
        <div className="flex flex-col gap-y-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={
                "flex flex-col justify-center items-center p-4 mx-0.5 bg-light-light border border-light-light dark:border-dark-light hover:border-light-graybutton dark:bg-dark-light hover:bg-light-dark hover:dark:bg-dark-radargrid hover:dark:border-dark-graybutton cursor-pointer rounded-lg"
              }
            >
              <div className="flex flex-row justify-between w-full items-center">
                <span
                  className="text-l cursor-pointer"
                  onClick={() => selectSkill(skill)}
                >
                  {skill.name}
                </span>
                <Button type={"secondary"} callback={() => action(skill)}>
                  {t("skills.add")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {search.length > 0 && skills.length === 0 && (
        <div className="flex flex-col justify-center px-2 py-4 rounded-lg bg-light-dark dark:bg-dark-dark my-2">
          <div className="flex flex-col justify-around">
            <span className="text-center my-2">
              {t("skills.noMatchingSkills")}
            </span>
          </div>
          <span className="p-2 text-center font-bold">
            {t("skills.addNewSkill").replace("%skill%", search)}
          </span>
          <Button
            type={"primary"}
            callback={addSkillButtonClick}
            uppercase={false}
          >
            {t("skills.addButton").replace("%skill%", search)}
          </Button>
        </div>
      )}
      {didYouMeanSkills && didYouMeanSkills.length > 0 && (
        <>
          <div className="flex flex-row justify-center my-2">
            <span>{t("skills.didYouMean")}</span>
          </div>
          <div className="flex flex-col gap-y-2">
            {didYouMeanSkills?.map((skill) => (
              <div
                key={skill.id}
                className={
                  "flex flex-col justify-center items-center p-4 mx-0.5 bg-light-light dark:bg-dark-light rounded-lg"
                }
              >
                <div className="flex flex-row justify-between w-full items-center">
                  <span
                    className="text-l cursor-pointer"
                    onClick={() => selectSkill(skill)}
                  >
                    {skill.name}
                  </span>
                  <Button type={"secondary"} callback={() => action(skill)}>
                    {t("skills.add")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {openSkillDetails ? (
        <Modal closeModal={closeModal}>
          <SkillDetails skill={selectedSkill}></SkillDetails>
        </Modal>
      ) : null}
    </div>
  );
};

export default AddSkillListSelector;
