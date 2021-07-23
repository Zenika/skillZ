import React, { useContext, useState } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import { ProgressBar } from "./progressBar";
import { BadgeSubojectives } from "./badges";
import { StatisticsHighlights } from "./StatisticsHighlights";
import styles from "./Statistics.module.css";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { AchievementRequestData } from "../../api/achievement"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { GetSkillCountForCategoryFromSkillQuery } from "../../../utils/achievements/categoryCompletionAchievement";


const GET_DATA_FOR_ACHIEVEMENTS = gql`
query getDataForAchievments{
  UserAchievements {
    additionalInfo
    created_at
    label
    points
    step
    userEmail
  }
}`;
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
  const {data, error, loading} = useQuery<AchievementsResult>(GET_DATA_FOR_ACHIEVEMENTS, {
    fetchPolicy: "network-only",
  });

  if(loading){
    return 'Loading...';
  }
  if(error){
    return errorMsg.concat(error.name, ", Message: ", error.message);
  }
 console.log(data[0].step);
  console.log("*************")
  //useEffect
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
        <BadgeSubojectives src="/img/badges/medaille.svg" />

        <BadgeSubojectives src="/img/badges/medaille.svg" />
        <BadgeSubojectives src="/img/badges/medaille.svg" />
        <BadgeSubojectives src="/img/badges/medaille.svg" />
        <BadgeSubojectives src="/img/badges/medaille.svg" />
        <BadgeSubojectives src="/img/badges/medaille.svg" />
      </div>
    </div>
  );
};
