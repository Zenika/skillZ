import { FetchedSkill } from "../../utils/types";
import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import Button from "../Button";
import { UPDATE_SKILL_DESCRIPTION } from "../../graphql/mutations/skills";
import { displayNotification } from "../../utils/displayNotification";
import { i18nContext } from "../../utils/i18nContext";
import TextArea from "../TextArea";

type SkillDescriptionProps = {
  skill: FetchedSkill;
  title: string;
  refetchSkill: () => void;
};

const SkillDescription = ({
  skill,
  title,
  refetchSkill,
}: SkillDescriptionProps) => {
  const [descriptionInput, setDescriptionInput] = useState(skill?.description);
  const { t } = useContext(i18nContext);

  /*
   * MUTATIONS
   */
  const [updateDescription] = useMutation(UPDATE_SKILL_DESCRIPTION);

  const editDescriptionAction = () => {
    if (descriptionInput.length > 0) {
      updateDescription({
        variables: {
          skillId: skill?.id,
          desc: descriptionInput,
        },
      }).then(() => {
        refetchSkill();
        displayNotification(
          t("admin.notification.descriptionSuccess").replace(
            "%skill%",
            skill?.name
          ),
          "green",
          5000
        );
      });
    } else {
      displayNotification(
        t("admin.notification.descriptionEmpty"),
        "red",
        5000
      );
    }
  };

  return (
    <div
      className={`flex flex-col rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2`}
    >
      <p className="text-xl p-2">{title}</p>
      <TextArea
        error={skill?.description?.length === 0 || skill?.description === null}
        callback={setDescriptionInput}
        value={descriptionInput}
        name={"updateDescription"}
        errorMessage={t("error.requiredField")}
        rows={4}
      ></TextArea>
      <div className="my-2 self-center">
        <Button
          type="primary"
          disabled={descriptionInput === skill?.description}
          callback={() => editDescriptionAction()}
        >
          {t("admin.save")}
        </Button>
      </div>
    </div>
  );
};

export default SkillDescription;
