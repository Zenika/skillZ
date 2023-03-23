import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DeleteSkillMutation } from "../../generated/graphql";
import { DELETE_SKILL_MUTATION } from "../../graphql/mutations/skills";
import { displayNotification } from "../../utils/displayNotification";
import { i18nContext } from "../../utils/i18nContext";
import { FetchedSkill } from "../../utils/types";
import Button from "../atoms/Button";

type SkillAdminPanelProps = {
  skill: FetchedSkill;
  approvedSkills: boolean;
  onEditClick?: () => void;
  onDuplicateClick?: () => void;
};

const SkillAdminPanel = ({
  skill,
  approvedSkills,
  onEditClick,
  onDuplicateClick,
}: SkillAdminPanelProps) => {
  const { t } = useContext(i18nContext);
  const router = useRouter();

  /*
   * MUTATIONS
   */
  const [deleteSkill] = useMutation<DeleteSkillMutation>(DELETE_SKILL_MUTATION);

  const deleteSkillButtonClick = async () => {
    await deleteSkill({ variables: { skillId: skill.id } })
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
        <div className="flex flex-row justify-end">
          {onDuplicateClick && (
            <div className="flex flex-col mr-2">
              <Button type={"secondary"} callback={onDuplicateClick}>
                {t("admin.duplicate")}
              </Button>
            </div>
          )}
          {approvedSkills && onEditClick && (
            <div className="flex flex-col mr-2">
              <Button type={"primary"} callback={onEditClick}>
                {t("admin.modify")}
              </Button>
            </div>
          )}
          {!approvedSkills && (
            <>
              <div className="flex flex-col mr-2">
                <Button type={"secondary"} callback={deleteSkillButtonClick}>
                  {t("admin.deleteSkill")}
                </Button>
              </div>
              <div className="flex flex-col mr-2">
                <Button type={"primary"} callback={onEditClick}>
                  {t("admin.verified")}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillAdminPanel;
