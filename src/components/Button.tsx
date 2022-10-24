type ButtonProps = {
  text: string;
  type: "primary" | "secondary";
  callback: () => void;
  disabled?: boolean;
  uppercase?: boolean;
};

const Button = ({
  text,
  type,
  callback,
  uppercase = true,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`${type === "primary" && "gradient-red"} ${
        type === "secondary" && "bg-light-graybutton dark:bg-dark-graybutton"
      } text-base text-white font-bold py-2 px-5 rounded-full disabled:opacity-25 ${
        uppercase ? "uppercase" : "normal-case"
      }`}
      disabled={disabled}
      onClick={callback}
    >
      {text}
    </button>
  );
};

export default Button;
