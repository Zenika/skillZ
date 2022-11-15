import { Topic } from "../utils/types";
import Button from "./Button";

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
      <div className="flex flex-row flex-wrap justify-around px-4">
        {topics.map((topic, key) => {
          const selected = selectedTopics.some((t) => topic.id === t);
          return (
            <div className="flex-inital py-2" key={key}>
              <Button
                disabled={readOnly}
                type={"tertiary"}
                style={selected ? "contained" : "faded"}
                callback={
                  selected
                    ? () => removeCallback(topic)
                    : () => addCallback(topic)
                }
              >
                <p className="text-sm">{topic.name}</p>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
