import React from "react";
import Image from "next/image";
import styles from "./StatisticsHighlights.module.css";

export const StatisticsHighlights = ({src, number, libelle}) => {
  return (
    <section className={styles.StatisticsHighlightsContent}>
      <Image
        className={styles.imageFilter}
        src={src}
        width="38"
        height="38"
        color=""
      />
      <div className={styles.StatisticsHighlightsContentText}>
        <span>{number}</span>
        <p>{libelle}</p>
      </div>
    </section>
  );
};