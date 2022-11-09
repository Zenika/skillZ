import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import { FetchedSkill } from "../utils/types";
import Button from "./Button";

type AddOrEditSkillModalProps = {
  skill?: FetchedSkill;
  cancel: () => void;
  callback: (skill: FetchedSkill) => void;
  add?: string | string[];
};

const AddOrEditSkillModal = ({
  skill,
  cancel,
  callback,
  add
}: AddOrEditSkillModalProps) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const [navState, setNavState] = useState("knowledge");
  const [skillLevel, setSkillLevel] = useState(skill?.skillLevel || 0);
  const [desireLevel, setDesireLevel] = useState(skill?.desireLevel || 0);

  const onAddButtonClick = () => {
    callback({ ...skill, skillLevel, desireLevel, add: true });
  };

  const onDeleteButtonClick = () => {
    callback({ ...skill, add: false });
  };

  return (
    <div id="addOrEditSkillModal" className="flex flex-col my-16 mx-6 bg-light-light dark:bg-dark-light p-6 rounded-lg max-w-screen-sm w-full z-50 overflow-y-scroll max-tablet:h-75v">
      <div className="flex flex-row place-content-between">
        <h1 className="flex-start px-2 my-4 text-xl text-bold">
          {skill?.name}
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            {/* TOTO: Custom Component for navigation tab*/}
            <button className="p-2" onClick={() => setNavState("knowledge")}>
              {t("skills.modal.knowledge")}
            </button>
            <span
              className={`h-1 rounded-full ${
                navState === "knowledge" ? "gradient-red" : ""
              }`}
            />
          </div>
          <div className="flex flex-col">
            {/* TOTO: Custom Component for navigation tab*/}
            <button className="p-2" onClick={() => setNavState("desire")}>
              {t("skills.modal.desire")}
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
                className="flex flex-row text-left my-2"
              >
                <span className="shrink-0 my-0.5">
                  <Image
                    src={`/icons/${darkMode ? "dark" : "light"}/${
                      skillLevel === index ? "full" : "empty"
                    }-select.svg`}
                    alt={"level"}
                    height={32}
                    width={32}
                    layout="fixed"
                  />
                </span>
                <span className="ml-2 mt-1 text-base">{`${index} : ${t(
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
                className="flex flex-row text-left my-2"
              >
                <span className="shrink-0 my-0.5">
                  <Image
                    src={`/icons/${darkMode ? "dark" : "light"}/${
                      desireLevel === index ? "full" : "empty"
                    }-select.svg`}
                    alt={"level"}
                    height={32}
                    width={32}
                    layout="fixed"
                  />
                </span>

                <span className="pl-2 pt-1 text-base">{`${index} : ${t(
                  `desireLevels.${index}`
                )}`}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between flex-wrap gap-4">
        <Button type={"secondary"} style={"contained"} callback={cancel}>
          {t("skills.modal.cancel")}
        </Button>
        <div className="flex flex-row gap-4 flex-wrap">
          {!add ? <Button
            type={"primary"}
            style={"outlined"}
            callback={onDeleteButtonClick}
            disabled={
              skillLevel === 0 ||
              desireLevel === 0 ||
              !skill.desireLevel ||
              !skill.skillLevel
            }
          >
            {t("skills.modal.delete")}
          </Button> : null}
          <Button
            type={"primary"}
            style={"contained"}
            callback={onAddButtonClick}
            disabled={skillLevel === 0 || desireLevel === 0}
          >
            {t("skills.modal.addSkill")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditSkillModal;
