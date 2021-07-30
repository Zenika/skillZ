import React, { Component } from "react";
import styles from "./ProgressBar.module.css";

export const ProgressBar = (props) => {
  return (
    <div className={styles.progresseTrackerBackground}>
      <div
        className={styles.progressTracker}
        style={{ width: `${props.percentage}%` }}
      />
    </div>
  );
};
