import React, { useContext } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import { useDarkMode } from "../../../utils/darkMode";
import {
  BadgeSubojectivesCategoryCompletion,
  BadgeSubojectivesProfileCompletion,
} from "./badges";

export const Statistics = ({
  userAchievements,
  skillsDatas,
  countTopics,
  userAgency,
  myStatistics,
}) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();

  const filterCountSkills = (label) =>
    skillsDatas.find((c) => c.label === label).CurrentSkillsAndDesires_aggregate
      .aggregate.count;

  console.log("userAchievements", userAchievements);
  return (
    <div
      className={`${
        darkMode
          ? "bg-dark-dark pb-4 pl-4 pr-4 mt-4 flex-col rounded-lg"
          : "bg-light pb-4 pl-4 pr-4 mt-4 flex-col rounded-lg"
      }`}
    >
      <h2 className="pb-2 pr-2 pt-6 text-2xl">
        {myStatistics
          ? t("statistics.myTitleSection")
          : t("statistics.titleSection")}
      </h2>
      <BadgeSubojectivesCategoryCompletion
        label={skillsDatas?.find((skill) => skill.label === "practices").label}
        datas={userAchievements}
        src="/img/badges/badge.svg"
        countSkills={filterCountSkills("practices")}
      />
      <BadgeSubojectivesCategoryCompletion
        label={skillsDatas?.find((skill) => skill.label === "activities").label}
        datas={userAchievements}
        src="/img/badges/badge.svg"
        countSkills={filterCountSkills("activities")}
      />
      <BadgeSubojectivesCategoryCompletion
        label={skillsDatas?.find((skill) => skill.label === "knowledge").label}
        datas={userAchievements}
        src="/img/badges/badge.svg"
        countSkills={filterCountSkills("knowledge")}
      />
      <BadgeSubojectivesCategoryCompletion
        label={skillsDatas?.find((skill) => skill.label === "behaviors").label}
        datas={userAchievements}
        src="/img/badges/badge.svg"
        countSkills={filterCountSkills("behaviors")}
      />
      <BadgeSubojectivesProfileCompletion
        src="/img/badges/badge.svg"
        countTopics={countTopics}
        userAgency={userAgency}
      />
    </div>
  );
};
