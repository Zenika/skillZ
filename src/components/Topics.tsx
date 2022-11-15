import { Topic } from "../utils/types";

type TopicsRequiredProps = {
  topics: Topic[];
  selectedTopics: string[];
  title: string;
};

type TopicsOptionalProps =
  | {
      readOnly?: false;
      addCallback: (topic: Topic) => void;
      removeCallback: (topic: Topic) => void;
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
      <div className="flex flex-row flex-wrap justify-around">
        {topics.map((topic) => {
          const selected = selectedTopics.some((t) => topic.id === t);
          return (
            <button
              disabled={readOnly}
              key={topic.name}
              className={`rounded-full m-2 ${
                selected ? "gradient-red" : "gradient-red-faded"
              } ${readOnly ? "cursor-default" : ""}`}
              onClick={
                selected
                  ? () => removeCallback(topic)
                  : () => addCallback(topic)
              }
            >
              <span className="px-2 py-1 text-white">{topic.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
