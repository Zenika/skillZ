import React, { useContext } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import { BadgeSection } from "./BadgeSection";
import ProgressBar from "../ProgressBar";
import { BadgeProfileCreation } from "./BadgeProfileCreation";
import { DayStreak } from "./DayStreak";
import styles from "./Statistics.module.css";
import { NumberCompetencies } from "./NumberCompetencies";

export const Statistics = () => {
  const { t } = useContext(i18nContext);
  return (
    <div>
      <h2 className={styles.StatisticsTitle}>{t("statistics.titleSection")}</h2>
      <div className={styles.Statistics}>
        <DayStreak />
        <NumberCompetencies />
      </div>
      <div className={styles.StatisticsRanking}>
        <BadgeSection />
        <div className={styles.StasticsRankingInterText}>
          <p>{t("statistics.sentenceRankIncodming1")}</p>
          <p>{t("statistics.sentenceRankIncodming2")}</p>
          <ProgressBar />
        </div>
        <div className={styles.StasticsSubObjectives}>
          <BadgeProfileCreation />
          <BadgeSection />
          <BadgeSection />
          <BadgeSection />
          <BadgeSection />
          <BadgeSection />
        </div>
      </div>
    </div>
  );
};
