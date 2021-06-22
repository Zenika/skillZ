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
        className={`relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in rounded-full `}
      >
        <div
          className={`absolute block w-6 h-6 rounded-full border-4 bg-light-med dark:bg-dark-med border-light-graytext dark:border-dark-graytext appearance-none cursor-pointer gradient-red ${
            selectedValue === values[1] ? "right-0" : ""
          }`}
        />
        <label
          className={`block overflow-hidden h-6 rounded-full bg-light-med dark:bg-dark-med cursor-pointer ${
            alwaysFull ? "gradient-red" : ""
          } ${selectedValue === values[1] ? "right-0 gradient-red" : ""}`}
        ></label>
      </div>
    </div>
  );
};
