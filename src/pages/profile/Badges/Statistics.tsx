import React, { useContext } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import { BadgeSection } from "./BadgeSection";
import ProgressBar from "../ProgressBar";
import { BadgeProfileCreation, BadgeRecurrency, BadgeSkillsEntered, BadgeAnecdotesAdded, BadgeEvents, BadgeTalks } from "./BadgesSubojectives";
import { DayStreak } from "./DayStreak";
import styles from "./Statistics.module.css";
import { NumberCompetencies } from "./NumberCompetencies";

export const Statistics = () => {
  const { t } = useContext(i18nContext);
  return (
    <div className={styles.StatisticsRanking}>
      <h2 className={styles.StatisticsTitle}>{t("statistics.titleSection")}</h2>
      <div className={styles.Statistics}>
        <DayStreak />
        <NumberCompetencies />
      </div>
      <div className={styles.line}></div>
        <div className={styles.StasticsRankingInterText}>
        <BadgeSection />
          <p>{t("statistics.sentenceRankIncodming1")}</p>
          <p>{t("statistics.sentenceRankIncodming2")}</p>
        </div>
          <ProgressBar />
          <div className={styles.line}></div>
        <div className={styles.StasticsSubObjectives}>
          <BadgeProfileCreation />
          <BadgeRecurrency />
          <BadgeSkillsEntered />
          <BadgeAnecdotesAdded />
          <BadgeEvents />
          <BadgeTalks />
        </div>
    </div>
  );
};
