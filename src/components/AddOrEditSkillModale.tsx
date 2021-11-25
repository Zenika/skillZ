import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";

type AddOrEditSkillModaleProps = {
  skill?: Skill;
  cancel: () => void;
  callback: (skill: Skill) => void;
};

const AddOrEditSkillModale = ({
  skill,
  cancel,
  callback,
}: AddOrEditSkillModaleProps) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const [navState, setNavState] = useState("knowledge");
  const [skillLevel, setSkillLevel] = useState(skill?.skillLevel || 0);
  const [desireLevel, setDesireLevel] = useState(skill?.desireLevel || 0);

  const onAddButtonClick = () => {
    callback({ ...skill, skillLevel, desireLevel });
  };

  useEffect(() => {
    if (
      skillLevel === 0 ||
      desireLevel === skill?.desireLevel ||
      desireLevel === 0
    ) {
      return;
    }
    onAddButtonClick();
  }, [desireLevel]);
  return (
    <div className="flex flex-col my-16 mx-6 bg-light-light dark:bg-dark-light p-6 rounded-lg max-w-screen-sm w-full z-50">
      <h1 className="px-2 my-4 text-xl text-bold">{skill?.name}</h1>
      <div className="flex flex-col">
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <button className="p-2" onClick={() => setNavState("knowledge")}>
              {t("skills.modale.knowledge")}
            </button>
            <span
              className={`h-1 rounded-full ${
                navState === "knowledge" ? "gradient-red" : ""
              }`}
            />
          </div>
          <div className="flex flex-col">
            <button className="p-2" onClick={() => setNavState("desire")}>
              {t("skills.modale.desire")}
            </button>
            <span
              className={`h-1 rounded-full ${
                navState === "desire" ? "gradient-red" : ""
              }`}
            />
          </div>
        </div>
        <div className="m-4">
          <div
            className={`flex flex-col ${
              navState === "knowledge" ? "" : "hidden"
            }`}
          >
            {[1, 2, 3, 4, 5].map((index) => (
              <button
                key={`skill-${index}`}
                onClick={() => {
                  setSkillLevel(index);
                  setNavState("desire");
                }}
                className="flex flex-row text-left py-1 my-2"
              >
                <Image
                  src={`/icons/${darkMode ? "dark" : "light"}/${
                    skillLevel === index ? "full" : "empty"
                  }-select.svg`}
                  height="32"
                  width="32"
                />
                <span className="pl-2 pt-1">{`${index} : ${t(
                  `skillLevels.${index}`
                )}`}</span>
              </button>
            ))}
          </div>
          <div
            className={`flex flex-col ${navState === "desire" ? "" : "hidden"}`}
          >
            {[1, 2, 3, 4, 5].map((index) => (
              <button
                key={`desire-${index}`}
                onClick={() => setDesireLevel(index)}
                className="flex flex-row text-left py-1 my-2"
              >
                <Image
                  src={`/icons/${darkMode ? "dark" : "light"}/${
                    desireLevel === index ? "full" : "empty"
                  }-select.svg`}
                  height="32"
                  width="32"
                />
                <span className="pl-2 pt-1">{`${index} : ${t(
                  `desireLevels.${index}`
                )}`}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <button
          onClick={() => cancel()}
          className="mx-1 px-5 py-2 bg-light-graybutton dark:bg-dark-graybutton rounded-full"
        >
          {t("skills.modale.cancel")}
        </button>
        <button
          disabled={skillLevel === 0 || desireLevel === 0}
          onClick={() => onAddButtonClick()}
          className="mx-1 px-5 py-2 gradient-red rounded-full disabled:opacity-25"
        >
          {t("skills.modale.addSkill")}
        </button>
      </div>
    </div>
  );
};

export default AddOrEditSkillModale;
