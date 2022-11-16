import { useQuery } from "@apollo/client/react";
import React, { useContext } from "react";
import { SkillDetailsQuery } from "../generated/graphql";
import { GET_SKILL_DETAILS } from "../graphql/queries/skills";
import { Skill } from "../utils/types";
import { i18nContext } from "../utils/i18nContext";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";

const SkillDetails = ({ skill }: { skill: Skill }) => {
  const { user } = useAuth0();
  const { t } = useContext(i18nContext);
  const {
    data: skillDetails,
    error,
    loading,
  } = useQuery<SkillDetailsQuery>(GET_SKILL_DETAILS, {
    variables: { skillId: skill.id || skill.skillId, email: user.email },
    fetchPolicy: "network-only",
  });

  return !loading ? (
    !error || skillDetails ? (
      <div className="flex w-full justify-start flex-col">
        <h1 className="text-xl">{skillDetails.Skill[0].name}</h1>
        <span className="text-sm text-dark-light/40 dark:text-light-dark/70">
          {skillDetails.Skill[0].description}
        </span>
        {skillDetails.Skill[0].UserSkillDesires.length > 0 && (
          <p>{skillDetails.Skill[0].UserSkillDesires[0].created_at}</p>
        )}
        <div className="flex flex-row flex-wrap justify-around my-2">
          {skillDetails.Skill[0].SkillTopics.length > 0 ? (
            <>
              <p className="text-m my-2">{t("admin.topics")} : </p>
              {skillDetails.Skill[0].SkillTopics.map((topic) => (
                <div
                  key={`topic-${topic.Topic.name}`}
                  className="rounded-full m-2 gradient-red"
                >
                  <Button
                    type={"tertiary"}
                    style={"contained"}
                    disabled={true}
                    visible={true}
                  >
                    {topic.Topic.name}
                  </Button>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    ) : (
      <div>{t("error.noData")}</div>
    )
  ) : (
    <div>{t("loading.loadingText")}</div>
  );
};

export default SkillDetails;
