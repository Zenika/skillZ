import React, { useContext } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import BadgeSection from "./BadgeSection";
import ProgressBar from "../ProgressBar";
import BadgeProfileCreation from "./BadgeProfileCreation";
import { DayStreak } from "./DayStreak";
import styles from "./Statistics.module.css";

export const Statistics = () => {
  const { t } = useContext(i18nContext);
  return (
    <div className={styles.Statistics}>
      <h2>{t("statistics.titleSection")}</h2>
      <DayStreak />
      {/*<div className="container p-2 my-2 mx-2 mx-auto flex flex-wrap">
        <BadgeSection />
        <div className="p-3">{t("statistics.sentenceRankIncodming1")}</div>
        <div className="p-3">{t("statistics.sentenceRankIncodming2")}</div>
        <ProgressBar />
      </div>
      <BadgeProfileCreation />
      <BadgeSection />
      <BadgeSection />
      <BadgeSection />
      <BadgeSection />
      <BadgeSection />*/}
    </div>
  );
};
