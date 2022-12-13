import { TopicItem } from "../utils/types";

type TopicType = "common" | "selected";

type TopicRequiredProps = {
  type: TopicType;
  topic: TopicItem;
  key: string | number;
};

type TopicOptionalProps =
  | {
      readOnly?: false;
      callback: (topic: TopicItem) => void;
    }
  | {
      readOnly: true;
      callback?: never;
    };

export type TopicProps = TopicRequiredProps & TopicOptionalProps;

const topicTypeClasses: Record<TopicType, string> = {
  common:
    "font-bold gradient-red-faded text-light-ultrawhite hover:shadow-xl hover:shadow-light-graybutton hover:dark:shadow-lg hover:dark:shadow-dark-radargrid",
  selected:
    "text-light-dark text-light-ultrawhite gradient-red hover:drop-shadow-xl hover:dark:shadow-lg hover:dark:shadow-dark-radargrid",
};

const classes = {
  base: "text-base font-bold py-1 px-5 rounded-full",
  disabled: "disabled:pointer-events-none",
  variant: topicTypeClasses,
};

const Topic = ({ type, topic, key, readOnly, callback }: TopicProps) => {
  return (
    <div className="flex-inital py-2" key={`topic-${key}`}>
      <button
        className={`${classes.base} ${classes.disabled} ${classes.variant[type]}`}
        disabled={readOnly}
        onClick={() => callback(topic)}
      >
        <p className="text-sm">{topic.name}</p>
      </button>
    </div>
  );
};

export default Topic;
