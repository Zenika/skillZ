import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { useDarkMode } from "../../utils/darkMode";
import { i18nContext } from "../../utils/i18nContext";
import LevelBar from "../atoms/LevelBar";

const UserSkillPanel = ({
  skill,
  context,
}: {
  skill: {
    id: any;
    name: string;
    level: number;
    desire: number;
    certif: boolean;
    user: {
      name: string;
      picture: string;
      agency: string;
      email: string;
    };
  };
  context: string;
}) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const { level, desire, certif } = skill;
  return (
    <Link href={`/profile/${skill.user.email}`}>
      <div className="flex flex-row bg-light-light dark:bg-dark-light hover:bg-light-dark border border-light-light dark:border-dark-light hover:border-light-graybutton dark:hover:bg-dark-radargrid dark:hover:border-dark-graybutton px-4 py-4 mx-2 my-1 rounded-lg cursor-pointer">
        <div
          className={`flex flex-col ${
            context !== "zenika" ? "w-5/6" : "w-full"
          }`}
        >
          <div className="flex flex-row justify-start">
            <Image
              className="h-16 w-16 rounded-full"
              height="64"
              width="64"
              src={skill.user.picture || ""}
              alt={skill.user.name}
            />
            <div className="flex flex-col ml-4">
              <div className="flex flex-row">
                <h2 className="text-xl">{skill.user.name}</h2>
                {certif ? (
                  <Image
                    src={`/icons/${darkMode ? "dark" : "light"}/certifs.svg`}
                    alt={"Certifications"}
                    height="30"
                    width="30"
                  />
                ) : (
                  <></>
                )}
              </div>
              <h3 className="text-md">{`Zenika ${skill.user.agency}`}</h3>
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col">
              <p className="text-xs text-center my-2">
                {t("skills.desireLevel")}
              </p>
              <LevelBar color="red" level={desire} />
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-center my-2">
                {t("skills.skillLevel")}
              </p>
              <LevelBar color="yellow" level={level} />
            </div>
          </div>
        </div>
        <div className="flex w-1/6 justify-end">
          <Image
            src={`/icons/${darkMode ? "dark" : "light"}/chevron.svg`}
            alt={"See"}
            width="8"
            height="12"
          />
        </div>
      </div>
    </Link>
  );
};

export default UserSkillPanel;
