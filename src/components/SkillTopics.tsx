import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useContext } from "react";
import {
  GetTopicsInfosQuery,
  SkillTopicsBySkillQuery,
} from "../generated/graphql";
import {
  ADD_SKILL_TO_TOPIC,
  DELETE_SKILL_TO_TOPIC,
} from "../graphql/mutations/skills";
import { GET_TOPICS_INFOS } from "../graphql/queries/topics";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import { FetchedSkill } from "../utils/types";

type skillTopicsProps = {
  refetch: any;
  readOnly: boolean;
  skill: FetchedSkill;
  skillTopics: any;
};

const skillTopics = ({
  refetch,
  readOnly,
  skill,
  skillTopics,
}: skillTopicsProps) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const { data: topics, loading: loadingTopics } =
    useQuery<GetTopicsInfosQuery>(GET_TOPICS_INFOS);

  const [insertTopic] = useMutation(ADD_SKILL_TO_TOPIC);
  const [deleteTopic] = useMutation(DELETE_SKILL_TO_TOPIC);

  const updateTopic = (selectedTopic: { id: string; name: string }) => {
    const skilltopic = skillTopics.skillTopic?.find(
      (value) => value.id === selectedTopic?.id
    );
    // if (!skilltopic) {
    //   insertTopic({
    //     variables: { email: user.email, topicId: selectedTopic.id },
    //   }).then(() =>
    //     refetch({
    //       variables: { email: user.email },
    //     })
    //   );
    // } else {
    //   deleteTopic({
    //     variables: { email: user.email, topicId: selectedTopic.id },
    //   }).then(() =>
    //     refetch({
    //       variables: { email: user.email },
    //     })
    //   );
    // }
  };

  useEffect(() => {
    if (topics) console.log("topics", topics);
  }, [topics]);

  return (
    <div
      className={`flex flex-col rounded-lg ${
        darkMode
          ? "bg-light-dark dark:bg-dark-dark my-2 p-2"
          : "bg-light dark:bg-dark-dark my-2 p-2"
      }`}
    >
      <span className="text-xl p-2">Topics</span>
      <div className="flex flex-row flex-wrap justify-around">
        {topics?.Topic.map((topic) => (
          <button
            disabled={readOnly}
            key={topic.name}
            className={`rounded-full m-2 ${
              skillTopics.SkillTopic.find(
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
export default skillTopics;
