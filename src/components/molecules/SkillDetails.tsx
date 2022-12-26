import { useQuery } from "@apollo/client/react";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { SkillDetailsQuery } from "../../generated/graphql";
import { GET_SKILL_DETAILS } from "../../graphql/queries/skills";
import { i18nContext } from "../../utils/i18nContext";
import { Skill } from "../../utils/types";
import Topic from "../atoms/Topic";
import EditTags from "./EditTags";

const SkillDetails = ({ skill }: { skill: Skill }) => {
  const { user } = useAuth0();
  const { t } = useContext(i18nContext);
  const {
    data: skillDetails,
    error,
    loading,
    refetch: refetchSkillDetails,
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
        {/* ---- TODO ---- Better handle of the date, as any update of a skill will create a new uerSkillDesire */}
        {/* {skillDetails.Skill[0].UserSkillDesires.length > 0 && (
          <p>{skillDetails.Skill[0].UserSkillDesires[0].created_at}</p>
        )} */}
        <div className="flex flex-row flex-wrap justify-start items-center my-2">
          {skillDetails.Skill[0].SkillTopics.length > 0 && (
            <>
              <p className="text-m my-2 mx-2">{t("admin.topics")} : </p>
              {skillDetails.Skill[0].SkillTopics.map((topic) => (
                <Topic
                  topic={topic.Topic}
                  key={topic.Topic.id}
                  type={"selected"}
                  readOnly
                />
              ))}
            </>
          )}
        </div>
        {skillDetails.Skill[0].SkillTags.length > 0 && (
          <div className="flex flex-row flex-wrap justify-start items-center my-2">
            <EditTags
              skill={skill}
              refetchSkill={refetchSkillDetails}
              description={t("skills.tags.description")}
            ></EditTags>
          </div>
        )}
      </div>
    ) : (
      <div>{t("error.noData")}</div>
    )
  ) : (
    <div>{t("loading.loadingText")}</div>
  );
};

export default SkillDetails;
