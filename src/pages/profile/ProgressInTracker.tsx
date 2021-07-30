import React, { Component } from "react";
import Image from "next/image";
import styles from "./ProgressInTracker.module.css";

const ProgressInTracker = ({ percentage }) => {
  return (
    <div
      className={styles.progressTracker}
      style={{ width: `${percentage}%` }}
    ></div>
  );
};

export default ProgressInTracker;
