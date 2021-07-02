import React, { Component } from "react";
import { BadgeSection } from "./BadgeSection";
import styles from "./BadgesSubojectives.module.css";

export const BadgeProfileCreation = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesFirst}>
      <BadgeSection />
    </div>
  );
};

export const BadgeRecurrency = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
      <BadgeSection />
    </div>
  );
};

export const BadgeSkillsEntered = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
      <BadgeSection />
    </div>
  );
};

export const BadgeAnecdotesAdded = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
      <BadgeSection />
    </div>
  );
};

export const BadgeEvents = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
      <BadgeSection />
    </div>
  );
};

export const BadgeTalks = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesEnd}>
      <BadgeSection />
    </div>
  );
};
