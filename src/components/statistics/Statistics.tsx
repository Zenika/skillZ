import React, { useContext } from "react";
import { i18nContext } from "../../utils/i18nContext";
import { useDarkMode } from "../../utils/darkMode";
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
        themeToCompare="languages-and-frameworks"
        datas={userAchievements}
        src="/img/badges/badge.svg"
        titleSubobjective={t(
          "statistics.subobjectivesTitles.LanguageAndFrameworks"
        )}
        descriptionSubobjective={
          myStatistics
            ? t("statistics.subobjectivesLegends.LanguageAndFrameworks")
            : ""
        }
        countSkills={filterCountSkills("languages-and-frameworks")}
      />
      <BadgeSubojectivesCategoryCompletion
        themeToCompare="platforms"
        datas={userAchievements}
        src="/img/badges/badge.svg"
        titleSubobjective={t("statistics.subobjectivesTitles.Plateform")}
        descriptionSubobjective={
          myStatistics ? t("statistics.subobjectivesLegends.Plateform") : ""
        }
        countSkills={filterCountSkills("platforms")}
      />
      <BadgeSubojectivesCategoryCompletion
        themeToCompare="tools"
        datas={userAchievements}
        src="/img/badges/badge.svg"
        titleSubobjective={t("statistics.subobjectivesTitles.Tools")}
        descriptionSubobjective={
          myStatistics ? t("statistics.subobjectivesLegends.Tools") : ""
        }
        countSkills={filterCountSkills("tools")}
      />
      <BadgeSubojectivesCategoryCompletion
        themeToCompare="technics-and-methods"
        datas={userAchievements}
        src="/img/badges/badge.svg"
        titleSubobjective={t(
          "statistics.subobjectivesTitles.TechnicsAndMethod"
        )}
        descriptionSubobjective={
          myStatistics
            ? t("statistics.subobjectivesLegends.TechnicsAndMethod")
            : ""
        }
        countSkills={filterCountSkills("technics-and-methods")}
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
