import { FetchedSkill } from "../../utils/types";
import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import Button from "../Button";
import { UPDATE_SKILL_DESCRIPTION } from "../../graphql/mutations/skills";
import { displayNotification } from "../../utils/displayNotification";
import { i18nContext } from "../../utils/i18nContext";

type SkillDescription = {
  skill: FetchedSkill;
  title: string;
};

const SkillDescription = ({ skill, title }: SkillDescription) => {
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
      <div className="flex flex-col mt-4 mb-4">
        <textarea
          className={`bg-light-light dark:bg-dark-light p-3 appearance-none rounded-lg border border-solid border-light-dark`}
          rows={4}
          name="updateDescription"
          value={descriptionInput}
          onChange={(e) => {
            setDescriptionInput(e.target.value);
          }}
        ></textarea>
      </div>
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
