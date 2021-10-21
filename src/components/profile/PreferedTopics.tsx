import { useContext } from "react";
import { useDarkMode } from "../../utils/darkMode";
import { i18nContext } from "../../utils/i18nContext";
import { userInfosQueries } from "../../graphql/queries/userInfos";
import { useMutation } from "@apollo/client";
import styles from "./DisablePointer.module.css";

type PreferedTopicsProps = {
  topics: { id: string; name: string; UserTopics: { created_at: string }[] }[];
  refetch: any;
  user: {
    email: string;
    name: string;
    picture: string;
    UserLatestAgency: { agency: string };
  }[];
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
  const [insertTopic] = useMutation(
    userInfosQueries.INSERT_USER_TOPIC_MUTATION
  );
  const [deleteTopic] = useMutation(
    userInfosQueries.DELETE_USER_TOPIC_MUTATION
  );
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
        variables: { email: user[0]?.email, topicId: selectedTopic.id },
      }).then(() =>
        refetch({
          variables: { email: user[0]?.email },
        })
      );
    } else {
      deleteTopic({
        variables: { email: user[0]?.email, topicId: selectedTopic.id },
      }).then(() =>
        refetch({
          variables: { email: user[0]?.email },
        })
      );
    }
  };

  return (
    <div
      className={`${
        darkMode
          ? "flex flex-col rounded-lg bg-light-dark dark:bg-dark-dark my-2 p-2"
          : "flex flex-col rounded-lg bg-light dark:bg-dark-dark my-2 p-2"
      }`}
    >
      <span className="text-xl p-2">{t("userProfile.topics")}</span>
      <div className="flex flex-row flex-wrap justify-around">
        {topics?.map((topic) => (
          <button
            disabled={readOnly ? true : false}
            key={topic.name}
            className={`rounded-full m-2 ${
              topic.UserTopics.length <= 0
                ? "gradient-red-faded"
                : "gradient-red"
            } ${readOnly ? styles.disablePointer : ""}`}
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
