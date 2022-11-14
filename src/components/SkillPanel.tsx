import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import { config } from "../env";
import { Skill } from "../utils/types";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import LevelBar from "./LevelBar";
import Modal from "./Modal";
import SkillDetails from "./SkillDetails";

const SkillPanel = ({
  skill,
  context,
  count,
  categoryLabel,
  onEditClick,
}: {
  skill: Skill;
  context: string;
  count?: number;
  categoryLabel: string;
  onEditClick?: (skill: Skill) => void;
}) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const { push, query } = useRouter();
  const [openSkillDetails, setOpenSkillDetails] = useState(false);
  const { agency } = query;
  const computedAgency =
    agency && agency !== "World"
      ? typeof agency === "string"
        ? agency
        : agency.join("")
      : undefined;

  const link = new URL(
    `${config.nextPublicBaseUrl}/skills/${encodeURIComponent(
      context
    )}/${encodeURIComponent(categoryLabel)}/${encodeURIComponent(skill.name)}/`
  );

  const linkToCategory = new URL(
    `${config.nextPublicBaseUrl}/skills/mine/${encodeURIComponent(
      categoryLabel
    )}`
  );

  const closeModal = () => {
    setOpenSkillDetails(false);
  };

  if (computedAgency) {
    link.searchParams.append("agency", computedAgency);
  }
  // Placeholder
  const certif = false;
  return (
    <div
      className={`flex flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg items-center`}
    >
      <div
        className={`flex flex-col ${
          context !== "zenika" && context !== "search" ? "w-5/6" : "w-full"
        }`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h2
              className="text-xl cursor-pointer"
              onClick={() => setOpenSkillDetails((curr) => (curr = !curr))}
            >
              {skill.name}
            </h2>
            {context === "search" && (
              <div className="py-2">
                <Button
                  type={"tertiary"}
                  style={"contained"}
                  color={skill.Category.color}
                  callback={() => push(linkToCategory)}
                >
                  {skill.Category.label}
                </Button>
              </div>
            )}
          </div>
          {(count || certif) && (
            <div className="flex flex-row items-center justify-around rounded-full w-16 px-1 py-1 bg-light-med dark:bg-dark-med h-8">
              <span>{count}</span>
              <BsFillPersonCheckFill />
              {certif && (
                <Image
                  src={`/icons/${darkMode ? "dark" : "light"}/certifs.svg`}
                  alt={"Certifications"}
                  height="30"
                  width="30"
                />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">{t("skills.skillLevel")}</p>
            <LevelBar
              color="yellow"
              level={
                skill.skillLevel
                  ? skill.skillLevel
                  : skill.UserSkillDesires?.length > 0
                  ? skill.UserSkillDesires[0].skillLevel
                  : 0
              }
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">
              {t("skills.desireLevel")}
            </p>
            <LevelBar
              color="red"
              level={
                skill.desireLevel
                  ? skill.desireLevel
                  : skill.UserSkillDesires?.length > 0
                  ? skill.UserSkillDesires[0].desireLevel
                  : 0
              }
            />
          </div>
        </div>
      </div>
      {onEditClick && (
        <div
          className="flex w-1/6 justify-end cursor-pointer"
          onClick={() => onEditClick(skill)}
        >
          <VscSettings size={20} />
        </div>
      )}
      {(context === "zenika" || context === "search") && (
        <div
          className="flex w-1/6 justify-end cursor-pointer"
          onClick={() => push(link)}
        >
          <AiFillEye size={20} />
        </div>
      )}
      {openSkillDetails ? (
        <Modal closeModal={closeModal}>
          <SkillDetails skill={skill} />
        </Modal>
      ) : null}
    </div>
  );
};

export default SkillPanel;
