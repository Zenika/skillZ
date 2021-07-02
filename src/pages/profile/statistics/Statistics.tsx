import React, { useContext } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import { ProgressBar } from "./progressBar";
import {
  BadgeSubojectives
} from "./badges";
import { StatisticsHighlights } from "./StatisticsHighlights";
import styles from "./Statistics.module.css";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";

/*const USER_NUMBER_SKILLS_QUERY = gql`
  query getUserSkillsAndTechnicalAppetites($email: String!) {
      CurrentSkillsAndDesires_aggregate(where: { userEmail: { _eq: $email } }) {
        aggregate {
          count
        }
      }
    }
`;*/

export const Statistics = () => {
  const { t } = useContext(i18nContext);
  return (
    <div className={styles.StatisticsRanking}>
      <h2 className={styles.StatisticsTitle}>{t("statistics.titleSection")}</h2>
      <div className={styles.Statistics}>
        <StatisticsHighlights src="/img/badges/flame.svg" number="4" libelle={t("statistics.dayStreak")}/>
        <StatisticsHighlights src="/img/badges/skills.svg" number="4" libelle={t("statistics.dayStreak")}/>
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
      <ProgressBar percentage={30}/>
      <div className={styles.line}></div>
      <div className={styles.StasticsSubObjectives}>
        <BadgeSubojectives src="/img/badges/medaille.svg"/>
        <BadgeSubojectives src="/img/badges/medaille.svg"/>
        <BadgeSubojectives src="/img/badges/medaille.svg"/>
        <BadgeSubojectives src="/img/badges/medaille.svg"/>
        <BadgeSubojectives src="/img/badges/medaille.svg"/>
        <BadgeSubojectives src="/img/badges/medaille.svg"/>
      </div>
    </div>
  );
};
