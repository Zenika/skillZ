import { TopicItem } from "../../utils/types";

type TopicType = "common" | "selected";

type TopicProps = {
  type: TopicType;
  topic: TopicItem;
  keyId: string | number;
  readOnly?: boolean;
  callback?: (topic: TopicItem) => void;
};

export const topicTypeClasses: Record<TopicType, string> = {
  common:
    "font-bold gradient-red-faded text-light-ultrawhite hover:shadow-xl hover:shadow-light-graybutton hover:dark:shadow-lg hover:dark:shadow-dark-radargrid",
  selected:
    "text-light-dark text-light-ultrawhite gradient-red hover:drop-shadow-xl hover:dark:shadow-lg hover:dark:shadow-dark-radargrid",
};

export const topicClasses = {
  base: "text-base font-bold py-1 px-5 rounded-full",
  disabled: "disabled:pointer-events-none",
  variant: topicTypeClasses,
};

const Topic = ({
  type,
  topic,
  keyId,
  callback,
  readOnly = false,
}: TopicProps) => {
  return (
    <div className="flex-initial py-2" key={`topic-${keyId}`}>
      <button
        className={`${topicClasses.base} ${topicClasses.disabled} ${topicClasses.variant[type]}`}
        disabled={readOnly}
        onClick={() => callback(topic)}
      >
        <p className="text-sm">{topic.name}</p>
      </button>
    </div>
  );
};

export default Topic;
