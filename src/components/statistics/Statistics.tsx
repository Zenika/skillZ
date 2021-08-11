import React, { useContext } from "react";
import { i18nContext } from "../../utils/i18nContext";
import { BadgeSubojectivesCategoryCompletion } from "./badges";

export const Statistics = ({ userAchievements, countSkills }) => {
  const { t } = useContext(i18nContext);

  const filterFunction = (themeToCompare) =>
    countSkills.find((c) => c.label === themeToCompare)
      .CurrentSkillsAndDesires_aggregate.aggregate.count;

  return (
    <div className="bg-dark-dark pb-4 pl-4 pr-4 mt-4 flex-col rounded">
      <h2 className="p-2 pt-4 text-2xl">{t("statistics.titleSection")}</h2>
      <BadgeSubojectivesCategoryCompletion
        themeToCompare="languages-and-frameworks"
        datas={userAchievements}
        src="/img/badges/medaille.svg"
        titleSubobjective={t(
          "subojectives.subObjectivesCategoryCompletionLanguageAndFrameworks"
        )}
        descriptionSubobjective={t(
          "subojectives.explicationSubObjectivesCategoryCompletionLanguageAndFrameworks"
        )}
        countSkills={filterFunction("languages-and-frameworks")}
      />
      <BadgeSubojectivesCategoryCompletion
        themeToCompare="platforms"
        datas={userAchievements}
        src="/img/badges/medaille.svg"
        titleSubobjective={t(
          "subojectives.subObjectivesCategoryCompletionPlateform"
        )}
        descriptionSubobjective={t(
          "subojectives.explicationSubObjectivesCategoryCompletionPlateform"
        )}
        countSkills={filterFunction("platforms")}
      />
      <BadgeSubojectivesCategoryCompletion
        themeToCompare="tools"
        datas={userAchievements}
        src="/img/badges/medaille.svg"
        titleSubobjective={t(
          "subojectives.subObjectivesCategoryCompletionTools"
        )}
        descriptionSubobjective={t(
          "subojectives.explicationSubObjectivesCategoryCompletionTools"
        )}
        countSkills={filterFunction("tools")}
      />
      <BadgeSubojectivesCategoryCompletion
        themeToCompare="technics-and-methods"
        datas={userAchievements}
        src="/img/badges/medaille.svg"
        titleSubobjective={t(
          "subojectives.subObjectivesCategoryCompletionTechnicsAndMethod"
        )}
        descriptionSubobjective={t(
          "subojectives.explicationSubObjectivesCategoryCompletionTechnicsAndMethod"
        )}
        countSkills={filterFunction("technics-and-methods")}
      />
    </div>
  );
};
