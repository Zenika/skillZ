import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import { config } from "../../env";
import { useDarkMode } from "../../providers/DarkModeProvider";
import { Skill } from "../../utils/types";
import LevelBar from "../atoms/LevelBar";
import Tag, { TagColor } from "../atoms/Tag";
import Modal from "../molecules/Modal";
import SkillDetails from "../molecules/SkillDetails";
import { useI18n } from "../../providers/I18nProvider";

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
  const { t } = useI18n();
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
    <>
      <div
        className={`flex flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg items-center cursor-pointer border border-light-light dark:border-dark-light hover:bg-light-dark hover:border-light-graybutton hover:dark:bg-dark-radargrid hover:dark:border-dark-graybutton`}
        onClick={(e) => {
          e.stopPropagation();
          setOpenSkillDetails((curr) => (curr = !curr));
        }}
      >
        <div
          className={`flex flex-col ${
            context !== "zenika" && context !== "search" ? "w-5/6" : "w-full"
          }`}
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="text-xl cursor-pointer">{skill.name}</h2>
              {context === "search" && (
                <Tag
                  name={skill.Category.label}
                  keyId={skill.Category.id}
                  color={skill.Category.color as TagColor}
                  callback={() => push(linkToCategory)}
                  uppercase
                />
              )}
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col">
              <p className="text-xs text-center my-2">
                {t("skills.skillLevel")}
              </p>
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
            className="flex w-1/6 justify-end"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(skill);
            }}
          >
            <VscSettings
              className="cursor-pointer p-1 rounded-2xl hover:bg-dark-light hover:text-light-light hover:dark:bg-light-light hover:dark:text-light-graytext"
              size={30}
            />
          </div>
        )}
        {(count || certif) && (
          <div
            className="flex flex-row items-center justify-around rounded-full w-16 px-1 py-1 bg-light-med dark:bg-dark-med h-8 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              push(link);
            }}
          >
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
      {openSkillDetails ? (
        <Modal closeModal={closeModal}>
          <SkillDetails skill={skill} />
        </Modal>
      ) : null}
    </>
  );
};

export default SkillPanel;
