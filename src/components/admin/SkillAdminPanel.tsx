import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext } from "react";
import {
  DeleteSkillMutation,
  SetVerifiedSkillMutationMutationFn,
} from "../../generated/graphql";
import {
  DELETE_SKILL_MUTATION,
  UPDATE_SKILL_VERIFIED_MUTATION,
} from "../../graphql/mutations/skills";
import { displayNotification } from "../../utils/displayNotification";
import { i18nContext } from "../../utils/i18nContext";
import { FetchedSkill } from "../../utils/types";
import Button from "../Button";

type SkillAdminPanelProps = {
  skill: FetchedSkill;
  approvedSkills: boolean;
  onEditClick?: () => void;
};

const SkillAdminPanel = ({
  skill,
  approvedSkills,
  onEditClick,
}: SkillAdminPanelProps) => {
  const { t } = useContext(i18nContext);
  const router = useRouter();

  /*
   * MUTATIONS
   */
  const [deleteSkill] = useMutation<DeleteSkillMutation>(DELETE_SKILL_MUTATION);
  const [updateVerifiedSkill] = useMutation<SetVerifiedSkillMutationMutationFn>(
    UPDATE_SKILL_VERIFIED_MUTATION
  );

  const deleteSkillButtonClick = async () => {
    await deleteSkill({ variables: { skillId: skill.id } })
      .then(() => {
        router.reload();
      })
      .catch(({}) => {
        displayNotification(`${t("error.unknown")}`, "red", 5000);
      });
  };

  const updateVerifiedSkillButtonClick = async () => {
    await updateVerifiedSkill({
      variables: { skillId: skill.id, verified: true },
    })
      .then(() => {
        router.reload();
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
        {!approvedSkills && (
          <div>
            <div className="flex flex-row justify-around">
              <div className="flex flex-col">
                <Button type={"secondary"} callback={deleteSkillButtonClick}>
                  {t("admin.deleteSkill")}
                </Button>
              </div>
              <div className="flex flex-col">
                <Button
                  type={"primary"}
                  callback={updateVerifiedSkillButtonClick}
                >
                  {t("admin.approved")}
                </Button>
              </div>
            </div>
          </div>
        )}
        {approvedSkills && onEditClick && (
          <div className="flex flex-end justify-end">
            <div className="flex flex-col">
              <Button type={"primary"} callback={onEditClick}>
                {t("admin.modify")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillAdminPanel;
