import { SlidingCheckbox } from "../atoms/SlidingCheckbox";

export const TutorialMode = ({
  t,
  tutorialMode,
  changeTutorialMode,
}: {
  t: (path: string) => string;
  tutorialMode: boolean;
  changeTutorialMode: (tutorialMode: boolean) => void;
}) => {
  const values: [any, any] = [false, true];

  return (
    <>
      <div
        className="cursor"
        onClick={() =>
          changeTutorialMode(tutorialMode === values[0] ? values[1] : values[0])
        }
      >
        <span>{t("sidepanel.tutorial")}</span>
        <ul className="flex flex-row justify-around">
          <li>🛑</li>
          <li>
            <SlidingCheckbox selectedValue={tutorialMode} values={values} />
          </li>
          <li>🦮</li>
        </ul>
      </div>
    </>
  );
};
