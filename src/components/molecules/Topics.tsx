import { useContext } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { i18nContext } from "../../utils/i18nContext";
import { TopicItem } from "../../utils/types";
import Topic from "../atoms/Topic";

type TopicsProps = {
  topics: TopicItem[];
  selectedTopics: string[];
  title: string;
  error?: boolean;
  readOnly?: boolean;
  addCallback?: (topic: TopicItem) => void;
  removeCallback?: (topic: TopicItem) => void;
};

const Topics = ({
  topics,
  selectedTopics,
  error,
  title,
  addCallback,
  removeCallback,
  readOnly = false,
}: TopicsProps) => {
  const { t } = useContext(i18nContext);

  return (
    <div
      className={`flex flex-col rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2`}
    >
      <div className="flex flex-row">
        <p className="text-xl p-2">{title}</p>
        {error && (
          <div className="flex flex-row items-center">
            <RiErrorWarningFill color="#bf1d67" />
            <p className="text-light-red pl-1">{t("error.topicRequired")}</p>
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap justify-around px-4">
        {topics.map((topic, key) => {
          const selected = selectedTopics.some((t) => topic.id === t);
          return (
            <Topic
              topic={topic}
              key={key}
              type={selected ? "selected" : "common"}
              callback={
                selected
                  ? () => removeCallback(topic)
                  : () => addCallback(topic)
              }
              readOnly={readOnly}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
