import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { UPDATE_SKILL_NAME } from "../../graphql/mutations/skills";
import { displayNotification } from "../../utils/displayNotification";
import { FetchedSkill } from "../../utils/types";
import Button from "../atoms/Button";
import TextArea from "../atoms/TextArea";
import { useI18n } from "../../providers/I18nProvider";

type SkillNameProps = {
  skill: FetchedSkill;
  refetchSkill: () => void;
};

const SkillName = ({ skill, refetchSkill }: SkillNameProps) => {
  const { t } = useI18n();

  /*
   * STATES
   */
  const [value, setValue] = useState(skill.name);

  /*
   * MUTATIONS
   */
  const [updateName] = useMutation(UPDATE_SKILL_NAME);

  const editNameAction = () => {
    if (value.length > 0) {
      updateName({
        variables: {
          skillId: skill?.id,
          name: value,
        },
      }).then(() => {
        refetchSkill();
        displayNotification(t("admin.notification.nameSuccess"), "green", 5000);
      });
    } else {
      displayNotification(t("admin.notification.nameEmpty"), "red", 5000);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2`}
    >
      <p className="text-xl p-2">{t("admin.name")}</p>
      <TextArea
        error={skill?.name?.length === 0 || skill?.name === null}
        callback={setValue}
        value={value}
        name={"updateName"}
        errorMessage={t("error.requiredField")}
        rows={1}
      ></TextArea>
      <div className="my-2 self-center">
        <Button
          type="primary"
          disabled={value === skill?.name}
          callback={() => editNameAction()}
        >
          {t("admin.save")}
        </Button>
      </div>
    </div>
  );
};

export default SkillName;
