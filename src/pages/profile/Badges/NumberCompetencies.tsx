import React, { useContext } from "react";
import Image from "next/image";
import styles from "./NumberCompetencies.module.css";
import { i18nContext } from "../../../utils/i18nContext";

export const NumberCompetencies = () => {
  const { t } = useContext(i18nContext);
  return (
    <section className={styles.numberCompetenciesContent}>
      <Image
        className={styles.imageFilter}
        src="/img/badges/skills.svg"
        width="38"
        height="38"
        color=""
      />
      <div className={styles.numberCompetenciesContentText}>
        <span>4</span>
        <p>{t("statistics.numberCompetencies")}</p>
      </div>
    </section>
  );
};
