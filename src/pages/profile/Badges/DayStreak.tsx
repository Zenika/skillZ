import React, { useContext } from "react";
import Image from "next/image";
import styles from "./DayStreak.module.css";
import { i18nContext } from "../../../utils/i18nContext";

export const DayStreak = () => {
  const { t } = useContext(i18nContext);
  return (
    <section className={styles.statisticsContent}>
      <Image
        className={styles.imageFilter}
        src="/img/badges/flame.svg"
        width="38"
        height="38"
        color=""
      />
      <div className={styles.statisticsContentText}>
        <span>4</span>
        <p>{t("statistics.dayStreak")}</p>
      </div>
    </section>
  );
};
