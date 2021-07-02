import React from "react";
import styles from "./BadgesSubojectives.module.css";
import Image from "next/image";

export const BadgeSubojectives= ({src}) => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
        <Image
        className="object-fill h-48 w-full object-center"
        src={src}
        width="35"
        height="35"
      />
    </div>
  );
};

/*export const BadgeRecurrency = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
        <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};

export const BadgeSkillsEntered = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
        <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};

export const BadgeAnecdotesAdded = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
        <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};

export const BadgeEvents = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
        <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};

export const BadgeTalks = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesEnd}>
        <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};*/
