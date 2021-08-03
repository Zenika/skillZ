import React, { Component } from "react";
import styles from "./ProgressBar.module.css";
//w-6/12 h-6 bg-red-700 rounded-3xl shadow-inner
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
