import React, { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";
import { useDarkMode } from "../../../utils/darkMode";
//w-6/12 h-6 bg-red-700 rounded-3xl shadow-inner
export const ProgressBar = ({ percentage }) => {
  const { darkMode } = useDarkMode();
  const [percentageValueVerif, setPercentageValueVerif] = useState(percentage);

  useEffect(() => {
    if (percentage >= 100) setPercentageValueVerif(100);
    else setPercentageValueVerif(percentage);
  }, [percentage]);

  return (
    <div
      className={`${
        darkMode
          ? styles.progresseTrackerBackgroundDark
          : styles.progresseTrackerBackgroundLight
      }`}
    >
      <div
        className={`${
          darkMode ? styles.progressTrackerDark : styles.progressTrackerLight
        }`}
        style={{ width: `${percentageValueVerif}%` }}
      />
    </div>
  );
};
