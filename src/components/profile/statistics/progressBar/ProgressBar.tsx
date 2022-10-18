import React, { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";
import Image from "next/image";
import { useDarkMode } from "../../../../utils/darkMode";

export const ProgressBar = ({ percentage, type, validateSrc }) => {
  const { darkMode } = useDarkMode();
  const [percentageValueVerif, setPercentageValueVerif] = useState(percentage);
  const [trackerCss, setTrackerCss] = useState(
    `${styles.progressTrackerBronze}`
  );
  const [validatorCss, setValidatorCss] = useState(`${styles.filterBronze}`);
  useEffect(() => {
    if (percentage >= 100) setPercentageValueVerif(100);
    else setPercentageValueVerif(percentage);

    if (type === "silver") {
      setTrackerCss(`${styles.progressTrackerSilver}`);
      setValidatorCss(`${styles.filterSilver}`);
    } else if (type === "gold") {
      setTrackerCss(`${styles.progressTrackerGold}`);
      setValidatorCss(`${styles.filterGold}`);
    } else if (type === "diamond") {
      setTrackerCss(`${styles.progressTrackerDiamond}`);
      setValidatorCss(`${styles.filterSilver}`);
    }
  }, [percentage]);

  return (
    <div
      className={`${
        darkMode
          ? styles.progresseTrackerBackgroundDark
          : styles.progresseTrackerBackgroundLight
      }`}
    >
      {percentage >= 100 ? (
        <div className="relative">
          <div
            className={trackerCss}
            style={{
              width: `${percentageValueVerif}%`,
              opacity: 0.2,
            }}
          />
          <div className="absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
            <Image
              className={validatorCss}
              src={"/img/badges/complete.svg"}
              alt={"Filter"}
              width="33"
              height="33"
            />
          </div>
        </div>
      ) : (
        <div
          className={trackerCss}
          style={{ width: `${percentageValueVerif}%` }}
        />
      )}
    </div>
  );
};
