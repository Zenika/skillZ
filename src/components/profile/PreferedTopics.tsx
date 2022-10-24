import { useMutation } from "@apollo/client";
import { useContext } from "react";
import {
  DELETE_USER_TOPIC_MUTATION,
  INSERT_USER_TOPIC_MUTATION,
} from "../../graphql/mutations/userInfos";
import { useDarkMode } from "../../utils/darkMode";
import { i18nContext } from "../../utils/i18nContext";

type PreferedTopicsProps = {
  topics: { id: string; name: string; UserTopics: { created_at: string }[] }[];
  refetch: any;
  user: {
    __typename?: string;
    email?: string;
    name?: string;
    picture?: string;
    UserLatestAgency?: { __typename?: string; agency?: string };
  };
  readOnly: boolean;
};

const PreferedTopics = ({
  topics,
  refetch,
  user,
  readOnly,
}: PreferedTopicsProps) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const [insertTopic] = useMutation(INSERT_USER_TOPIC_MUTATION);
  const [deleteTopic] = useMutation(DELETE_USER_TOPIC_MUTATION);
  const updateTopic = (selectedTopic: {
    id: string;
    name: string;
    UserTopics: { created_at: string }[];
  }) => {
    const topic = topics?.find(
      (value) =>
        selectedTopic.UserTopics.length > 0 && value.id === selectedTopic.id
    );
    if (!topic) {
      insertTopic({
        variables: { email: user.email, topicId: selectedTopic.id },
      }).then(() =>
        refetch({
          variables: { email: user.email },
        })
      );
    } else {
      deleteTopic({
        variables: { email: user.email, topicId: selectedTopic.id },
      }).then(() =>
        refetch({
          variables: { email: user.email },
        })
      );
    }
  };

  return (
    <div
      className={`flex flex-col rounded-lg ${
        darkMode
          ? "bg-light-dark dark:bg-dark-dark my-2 p-2"
          : "bg-light dark:bg-dark-dark my-2 p-2"
      }`}
    >
      <span className="text-xl p-2">{t("userProfile.topics")}</span>
      <div className="flex flex-row flex-wrap justify-around">
        {topics?.map((topic) => (
          // TODO: Custom component
          <button
            disabled={readOnly}
            key={topic.name}
            className={`rounded-full m-2 ${
              topic.UserTopics.length <= 0
                ? "gradient-red-faded"
                : "gradient-red"
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
export default PreferedTopics;
