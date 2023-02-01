import { SlidingCheckbox } from "../atoms/SlidingCheckbox";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const TutorialMode = ({ t }: { t: (path: string) => string }) => {
  const values: [any, any] = [false, true];
  const router = useRouter();
  const [tutorialMode, setTutorialMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("demo") === "true") setTutorialMode(true);
    else setTutorialMode(false);
  }, []);

  function changeTutorialMode() {
    if (tutorialMode === values[0]) {
      localStorage.setItem("demo", "true");
    } else localStorage.setItem("demo", "false");
    router.reload();
  }

  return (
    <>
      <div className="cursor" onClick={() => changeTutorialMode()}>
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
