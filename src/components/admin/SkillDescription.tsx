import { FetchedSkill } from "../../utils/types";
import React, { useState, useContext } from "react";
import { GetSkillDescriptionQuery } from "../../generated/graphql";
import { GET_SKILL_DESCRIPTION } from "../../graphql/queries/skills";
import { useMutation, useQuery } from "@apollo/client";
import Button from "../Button";
import { UPDATE_SKILL_DESCRIPTION } from "../../graphql/mutations/skills";
import { displayNotification } from "../../utils/displayNotification";
import { i18nContext } from "../../utils/i18nContext";

type SkillDescription = {
  skill: FetchedSkill;
  title: string;
};

const SkillDescription = ({ skill, title }: SkillDescription) => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const { t } = useContext(i18nContext);

  /*
   * QUERIES
   */
  const { data: dataSkillDescription, refetch: refetchSkillDescription } =
    useQuery<GetSkillDescriptionQuery>(GET_SKILL_DESCRIPTION, {
      variables: {
        skillId: skill?.id,
      },
    });

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
        refetchSkillDescription({
          variables: {
            skillId: skill?.id,
          },
        });
        setDescriptionInput("");
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
      <div className="self-center">
        {dataSkillDescription?.Skill[0].description.length > 0 ? (
          <p className="text-m p-2">
            {dataSkillDescription?.Skill[0].description}
          </p>
        ) : (
          <p className="text-m p-2 italic">No description</p>
        )}
      </div>
      <div className="flex flex-col mt-4 mb-4">
        <textarea
          className={`bg-light-light dark:bg-dark-light p-3 appearance-none rounded-lg border border-solid border-light-dark`}
          rows={4}
          name="updateDescription"
          value={descriptionInput}
          onChange={(e) => {
            setDescriptionInput(e.target.value);
          }}
          placeholder={"Modifier la description"}
        ></textarea>
      </div>
      <div className="my-2 self-center">
        <Button type="primary" callback={() => editDescriptionAction()}>
          {t("admin.save")}
        </Button>
      </div>
    </div>
  );
};

export default SkillDescription;
