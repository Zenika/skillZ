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

  const filterCountSkills = (themeToCompare) =>
    skillsDatas.find((c) => c.label === themeToCompare)
      .CurrentSkillsAndDesires_aggregate.aggregate.count;

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
        themeToCompare="practices"
        datas={userAchievements}
        src="/img/badges/badge.svg"
        titleSubobjective={t("statistics.subobjectivesTitles.Practices")}
        descriptionSubobjective={
          myStatistics ? t("statistics.subobjectivesLegends.Practices") : ""
        }
        countSkills={filterCountSkills("practices")}
      />
      <BadgeSubojectivesCategoryCompletion
        themeToCompare="activities"
        datas={userAchievements}
        src="/img/badges/badge.svg"
        titleSubobjective={t("statistics.subobjectivesTitles.Activities")}
        descriptionSubobjective={
          myStatistics ? t("statistics.subobjectivesLegends.Activities") : ""
        }
        countSkills={filterCountSkills("activities")}
      />
      <BadgeSubojectivesCategoryCompletion
        themeToCompare="knowledge"
        datas={userAchievements}
        src="/img/badges/badge.svg"
        titleSubobjective={t("statistics.subobjectivesTitles.Knowledge")}
        descriptionSubobjective={
          myStatistics ? t("statistics.subobjectivesLegends.Knowledge") : ""
        }
        countSkills={filterCountSkills("knowledge")}
      />
      <BadgeSubojectivesCategoryCompletion
        themeToCompare="behaviors"
        datas={userAchievements}
        src="/img/badges/badge.svg"
        titleSubobjective={t("statistics.subobjectivesTitles.Behaviors")}
        descriptionSubobjective={
          myStatistics ? t("statistics.subobjectivesLegends.Behaviors") : ""
        }
        countSkills={filterCountSkills("behaviors")}
      />
      <BadgeSubojectivesProfileCompletion
        src="/img/badges/badge.svg"
        countTopics={countTopics}
        userAgency={userAgency}
        titleSubobjective={t(
          "statistics.subobjectivesTitles.ProfileCompletion"
        )}
        descriptionSubobjective={
          myStatistics
            ? t("statistics.subobjectivesLegends.ProfileCompletion")
            : ""
        }
      />
    </div>
  );
};
