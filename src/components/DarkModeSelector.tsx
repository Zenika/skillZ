import { SlidingCheckbox } from "./SlidingCheckbox";

export const DarkModeSelector = ({
  darkMode,
  changeDarkMode,
  t,
}: {
  darkMode: boolean;
  changeDarkMode: (darkMode: boolean) => void; // eslint-disable-line no-unused-vars
  t: (path: string) => string; // eslint-disable-line no-unused-vars
}) => {
  const values: [any, any] = [false, true];
  return (
    <div
      className="cursor"
      onClick={() =>
        changeDarkMode(darkMode === values[0] ? values[1] : values[0])
      }
    >
      <span>{t("sidepanel.darkMode")}</span>
      <ul className="flex flex-row justify-around">
        <li>☀️</li>
        <li>
          <SlidingCheckbox selectedValue={darkMode} values={values} />
        </li>
        <li>🌑</li>
      </ul>
    </div>
  );
};
