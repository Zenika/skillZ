import React, { useContext, useEffect, useState } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import { ProgressBar } from "./progressBar";
import {
  BadgeSubojectivesCategoryCompletion,
  BadgeSubojectives,
} from "./badges";
import { StatisticsHighlights } from "./StatisticsHighlights";
import styles from "./Statistics.module.css";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { AchievementRequestData } from "../../api/achievement";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { GetSkillCountForCategoryFromSkillQuery } from "../../../utils/achievements/categoryCompletionAchievement";

const GET_DATA_FOR_ACHIEVEMENTS = gql`
  query getDataForAchievements {
    UserAchievements {
      additionalInfo
      created_at
      label
      points
      step
      userEmail
    }
  }
`;

type AchievementsResult = {
  UserAchievements: {
    created_at: string;
    points: number;
    label: string;
    userEmail: string;
    step: string;
    additionalInfo: string;
  }[];
};

export const Statistics = () => {
  const { t } = useContext(i18nContext);
  const { user, isLoading } = useAuth0();
  let errorMsg = "Error: ";
  const { data, error, loading } = useQuery<AchievementsResult>(
    GET_DATA_FOR_ACHIEVEMENTS,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  if (loading) {
    return "Loading...";
  }
  if (error) {
    return errorMsg.concat(error.name, ", Message: ", error.message);
  }
  return (
    <div className={styles.StatisticsRanking}>
      <h2 className={styles.StatisticsTitle}>{t("statistics.titleSection")}</h2>
      <div className={styles.Statistics}>
        <StatisticsHighlights
          src="/img/badges/flame.svg"
          number="4"
          libelle={t("statistics.dayStreak")}
        />
        <StatisticsHighlights
          src="/img/badges/skills.svg"
          number="4"
          libelle={t("statistics.dayStreak")}
        />
      </div>
      <div className={styles.line}></div>
      <div className={styles.StasticsRankingInterText}>
        <Image
          className="object-fill h-48 w-full object-center"
          src="/img/badges/medaille.svg"
          width="35"
          height="35"
        />
        <p>{t("statistics.sentenceRankIncodming1")}</p>
        <p>{t("statistics.sentenceRankIncodming2")}</p>
      </div>
      <ProgressBar percentage={30} />
      <div></div>
      <div className={styles.line}></div>
      <div className={styles.StasticsSubObjectives}>
        <BadgeSubojectivesCategoryCompletion
          themeToCompare="languages-and-frameworks"
          indexSkillCount="0"
          datas={data}
          src="/img/badges/medaille.svg"
          titleSubobjective={t(
            "subojectives.subObjectivesCategoryCompletionLanguageAndFrameworks"
          )}
          descriptionSubobjective={t(
            "subojectives.explicationSubObjectivesCategoryCompletionLanguageAndFrameworks"
          )}
        />
        <BadgeSubojectivesCategoryCompletion
          themeToCompare="platforms"
          indexSkillCount="1"
          datas={data}
          src="/img/badges/medaille.svg"
          titleSubobjective={t(
            "subojectives.subObjectivesCategoryCompletionPlateform"
          )}
          descriptionSubobjective={t(
            "subojectives.explicationSubObjectivesCategoryCompletionPlateform"
          )}
        />
        <BadgeSubojectivesCategoryCompletion
          themeToCompare="tools"
          indexSkillCount="2"
          datas={data}
          src="/img/badges/medaille.svg"
          titleSubobjective={t(
            "subojectives.subObjectivesCategoryCompletionTools"
          )}
          descriptionSubobjective={t(
            "subojectives.explicationSubObjectivesCategoryCompletionTools"
          )}
        />
        <BadgeSubojectivesCategoryCompletion
          themeToCompare="technics-and-methods"
          indexSkillCount="3"
          datas={data}
          src="/img/badges/medaille.svg"
          titleSubobjective={t(
            "subojectives.subObjectivesCategoryCompletionTechnicsAndMethod"
          )}
          descriptionSubobjective={t(
            "subojectives.explicationSubObjectivesCategoryCompletionTechnicsAndMethod"
          )}
        />
        <BadgeSubojectives src="/img/badges/medaille.svg" />
      </div>
    </div>
  );
};
