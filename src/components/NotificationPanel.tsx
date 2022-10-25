import { useContext } from "react";
import { i18nContext } from "../utils/i18nContext";
import Button from "./Button";
import {
  DELETE_SKILL_MUTATION,
  UPDATE_SKILL_VERIFIED_MUTATION,
} from "../graphql/mutations/skills";
import {
  DeleteSkillMutation,
  SetVerifiedSkillMutationMutationFn,
} from "../generated/graphql";
import { useMutation } from "@apollo/client";
import { displayNotification } from "../utils/displayNotification";

type Skill = { name: string; skillId: string; verified: boolean };

const NotificationPanel = ({ skill }: { skill: Skill }) => {
  const { t } = useContext(i18nContext);
  // const { darkMode } = useDarkMode();
  // const { push, query } = useRouter();
  // const { agency } = query;

  /*
   * MUTATIONS
   */
  const [deleteSkill] = useMutation<DeleteSkillMutation>(DELETE_SKILL_MUTATION);
  const [updateVerifiedSkill] = useMutation<SetVerifiedSkillMutationMutationFn>(
    UPDATE_SKILL_VERIFIED_MUTATION
  );

  const deleteSkillButtonClick = async () => {
    await deleteSkill({ variables: { skillId: skill.skillId } })
      .then((response) => {
        console.log("response", response);
      })
      .catch(({}) => {
        displayNotification(`${t("error.unknown")}`, "red", 5000);
      });
  };

  const updateVerifiedSkillButtonClick = async () => {
    await updateVerifiedSkill({
      variables: { skillId: skill.skillId, verified: true },
    })
      .then((response) => {
        console.log("response", response);
      })
      .catch(({}) => {
        displayNotification(`${t("error.unknown")}`, "red", 5000);
      });
  };

  return (
    <div
      className={`flex flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg items-center`}
    >
      <div className={`flex flex-col w-full`}>
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">{skill.name}</h2>
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <Button
              type={"primary"}
              style={"outlined"}
              callback={deleteSkillButtonClick}
            >
              {t("admin.deleteSkill")}
            </Button>
          </div>
          <div className="flex flex-col">
            <Button
              type={"primary"}
              style={"contained"}
              callback={updateVerifiedSkillButtonClick}
            >
              {t("admin.approved")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
