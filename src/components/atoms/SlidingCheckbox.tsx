export const SlidingCheckbox = ({
  values,
  selectedValue,
  alwaysFull,
}: {
  values: [any, any];
  selectedValue: any;
  alwaysFull?: boolean;
}) => {
  return (
    <div className="flex">
      <div
        className={`relative inline-block w-12 mr-2 align-middle transition select-none rounded-full ${
          selectedValue === values[1]
            ? "hover:brightness-125"
            : "hover:brightness-90 hover:dark:brightness-75"
        }`}
      >
        <div
          className={`absolute block w-6 h-6 rounded-full transition ease-in duration-300 border-4 border-light-graytext dark:border-dark-graytext appearance-none cursor-pointer ${
            selectedValue === values[1]
              ? "translate-x-full bg-light-red"
              : "bg-light-med dark:bg-dark-graybutton"
          }`}
        />
        <label
          className={`block overflow-hidden h-6 rounded-full transition ease-in duration-300 cursor-pointer ${
            alwaysFull ? "bg-light-red" : ""
          } ${
            selectedValue === values[1]
              ? "right-0 bg-light-red"
              : "bg-light-med dark:bg-dark-graybutton"
          }`}
        ></label>
      </div>
    </div>
  );
};
