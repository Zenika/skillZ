import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import { config } from "../env";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import LevelBar from "./LevelBar";

// type Skill = {
//   name?: string | null | undefined;
//   userCount?: any | null | undefined;
//   id?: any | null | undefined;
//   skillLevel?: any | null | undefined;
//   desireLevel?: any | null | undefined;
//   UserSkillDesires?: any | null;
// };

const NotificationPanel = ({}: {}) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const { push, query } = useRouter();
  const { agency } = query;

  return (
    <div
      className={`flex flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg items-center`}
    >
      <div className={`flex flex-col w-full`}>
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">skill name</h2>
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">{t("skills.skillLevel")}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">
              {t("skills.desireLevel")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
