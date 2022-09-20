import Image from "next/image";
import { useContext, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import { FetchedSkill } from "../utils/types";

type AddOrEditSkillModalProps = {
  skill?: FetchedSkill;
  cancel: () => void;
  callback: (skill: FetchedSkill) => void;
};

const AddOrEditSkillModal = ({
  skill,
  cancel,
  callback,
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
    <div className="flex flex-col my-16 mx-6 bg-light-light dark:bg-dark-light p-6 rounded-lg max-w-screen-sm w-full z-50">
      <div className="flex flex-row place-content-between">
        <h1 className="flex-start px-2 my-4 text-xl text-bold">
          {skill?.name}
        </h1>
        <button
          disabled={
            skillLevel === 0 ||
            desireLevel === 0 ||
            !skill.desireLevel ||
            !skill.skillLevel
          }
          className="mx-1 px-5 py-2 gradient-red rounded-full disabled:opacity-25 "
          onClick={onDeleteButtonClick}
        >
          <div className="grid justify-items-center">
            <RiDeleteBinFill />
            {t("skills.modal.delete")}
          </div>
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
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
                      desireLevel === index ? "full" : "empty"
                    }-select.svg`}
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
      <div className="flex flex-row justify-between">
        <button
          onClick={() => cancel()}
          className="mx-1 px-5 py-2 bg-light-graybutton dark:bg-dark-graybutton rounded-full"
        >
          {t("skills.modal.cancel")}
        </button>
        <button
          disabled={skillLevel === 0 || desireLevel === 0}
          onClick={() => onAddButtonClick()}
          className="mx-1 px-5 py-2 gradient-red rounded-full disabled:opacity-25"
        >
          {t("skills.modal.addSkill")}
        </button>
      </div>
    </div>
  );
};

export default AddOrEditSkillModal;