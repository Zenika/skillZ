import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { SetSkillCategoryMutation } from "../../generated/graphql";
import { SET_SKILL_CATEGORY } from "../../graphql/mutations/skills";
import { i18nContext } from "../../utils/i18nContext";
import { FetchedSkill } from "../../utils/types";
import Button from "../Button";

type EditSkillAdminModalProps = {
  skill: FetchedSkill;
  cancel: () => void;
  callback: (skill: FetchedSkill) => void;
};

const EditSkillAdminModal = ({
  skill,
  cancel,
  callback,
}: EditSkillAdminModalProps) => {
  const { t } = useContext(i18nContext);

  /*
   * MUTATIONS
   */
  const [
    setSkillCategory,
    { data: dataEditSkill, loading: loadingEditSkill, error: errorEditSkill },
  ] = useMutation<SetSkillCategoryMutation>(SET_SKILL_CATEGORY);

  const onAddButtonClick = () => {};

  const onDeleteButtonClick = () => {};

  return (
    <div className="flex flex-col my-16 mx-6 bg-light-light dark:bg-dark-light p-6 rounded-lg max-w-screen-sm w-full z-50">
      <div className="flex flex-row place-content-between">
        <h1 className="flex-start px-2 my-4 text-xl text-bold">{skill.name}</h1>
      </div>
      <div className="flex flex-col"></div>
      <div className="flex flex-row justify-between">
        <Button type={"secondary"} style={"contained"} callback={cancel}>
          {t("skills.modal.cancel")}
        </Button>
        <div className={"flex flex-row gap-4"}>
          <Button
            type={"primary"}
            style={"outlined"}
            callback={onDeleteButtonClick}
          >
            {t("skills.modal.delete")}
          </Button>
          <Button
            type={"primary"}
            style={"contained"}
            callback={onAddButtonClick}
          >
            {t("skills.modal.addSkill")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditSkillAdminModal;
