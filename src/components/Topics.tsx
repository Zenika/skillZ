import { TopicItem } from "../utils/types";
import Topic from "./Topic";

type TopicsRequiredProps = {
  topics: TopicItem[];
  selectedTopics: string[];
  title: string;
};

type TopicsOptionalProps =
  | {
      readOnly?: false;
      addCallback: (topic: TopicItem) => void;
      removeCallback: (topic: TopicItem) => void;
    }
  | {
      readOnly: true;
      addCallback?: never;
      removeCallback?: never;
    };

export type TopicsProps = TopicsRequiredProps & TopicsOptionalProps;

const Topics = ({
  topics,
  selectedTopics,
  title,
  addCallback,
  removeCallback,
  readOnly,
}: TopicsProps) => {
  return (
    <div
      className={`flex flex-col rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2`}
    >
      <p className="text-xl p-2">{title}</p>
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
              {...(readOnly && {
                readonly: true,
              })}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
