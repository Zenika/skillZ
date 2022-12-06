export type TagColor = "green" | "red" | "blue" | "yellow";

type TagRequiredProps = {
  color: TagColor;
  name: string;
  key: string | number;
  uppercase?: boolean;
};

type TagOptionalProps =
  | {
      readOnly?: false;
      callback: () => void;
    }
  | {
      readOnly: true;
      callback?: never;
    };

export type TagProps = TagRequiredProps & TagOptionalProps;

const topicColorClasses: Record<TagColor, string> = {
  green: "gradient-green",
  red: "gradient-red",
  blue: "gradient-blue",
  yellow: "gradient-yellow",
};

const classes = {
  base: "text-base font-bold py-1 px-5 rounded-full text-light-dark text-light-ultrawhite hover:drop-shadow-xl hover:dark:shadow-lg hover:dark:shadow-dark-radargrid",
  disabled: "disabled:pointer-events-none",
  color: topicColorClasses,
  uppercase: "uppercase",
};

const Tag = ({
  color,
  name,
  key,
  readOnly,
  callback,
  uppercase = false,
}: TagProps) => {
  return (
    <div className="flex-inital py-2" key={`tag-${key}`}>
      <button
        className={`${classes.base} ${classes.disabled} ${
          classes.color[color]
        } ${uppercase && classes.uppercase}`}
        disabled={readOnly}
        onClick={() => callback()}
      >
        <p className="text-sm">{name}</p>
      </button>
    </div>
  );
};

export default Tag;
