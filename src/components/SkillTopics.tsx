import { useMutation, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { GetTopicsInfosQuery } from "../generated/graphql";
import {
  ADD_SKILL_TO_TOPIC,
  DELETE_SKILL_TO_TOPIC,
} from "../graphql/mutations/skills";
import { GET_TOPICS_INFOS } from "../graphql/queries/topics";
import { i18nContext } from "../utils/i18nContext";
import { FetchedSkill } from "../utils/types";

type skillTopicsProps = {
  refetch: any;
  readOnly: boolean;
  skill: FetchedSkill;
  skillTopics: any;
};

const SkillTopics = ({
  refetch,
  readOnly,
  skill,
  skillTopics,
}: skillTopicsProps) => {
  /*
   * QUERIES
   */
  const { t } = useContext(i18nContext);
  const { data: topics } = useQuery<GetTopicsInfosQuery>(GET_TOPICS_INFOS);

  /*
   * MUTATIONS
   */
  const [insertTopic] = useMutation(ADD_SKILL_TO_TOPIC);
  const [deleteTopic] = useMutation(DELETE_SKILL_TO_TOPIC);

  const updateTopic = (selectedTopic: { id: string; name: string }) => {
    const skilltopic = skillTopics.SkillTopic?.find(
      (value) => value.topicId === selectedTopic?.id
    );
    if (!skilltopic) {
      insertTopic({
        variables: { skillId: skill?.id, topicId: selectedTopic.id },
      }).then(() =>
        refetch({
          variables: { skillId: skill?.id },
        })
      );
    } else {
      deleteTopic({
        variables: { skillId: skill?.id, topicId: selectedTopic.id },
      }).then(() =>
        refetch({
          variables: { skillId: skill?.id },
        })
      );
    }
  };

  return (
    <div
      className={`flex flex-col
      `}
    >
      <p className="text-m my-2">{t("admin.topics")}</p>
      <div className="flex flex-row flex-wrap justify-around my-2">
        {topics?.Topic.map((topic) => (
          <button
            disabled={readOnly}
            key={topic.name}
            className={`rounded-full m-2 ${
              skillTopics?.SkillTopic.find(
                (skilltopic) => skilltopic.topicId === topic.id
              )
                ? "gradient-red"
                : "gradient-red-faded"
            } ${readOnly ? "cursor-default" : ""}`}
            onClick={() => updateTopic(topic)}
          >
            <span className="px-2 py-1 text-white">{topic.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default SkillTopics;
