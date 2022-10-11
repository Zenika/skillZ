import Image from "next/image";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { useDarkMode } from "../../../../utils/darkMode";
import { ProgressBar } from "../progressBar/ProgressBar";
import { i18nContext } from "../../../../utils/i18nContext";
import styles from "./badgeLevels.module.css";

export const BadgeSubojectivesProfileCompletion = ({
  src,
  countTopics,
  userAgency,
}) => {
  const [percentageBarValue, setpercentageBarValue] = useState(0);
  const { darkMode } = useDarkMode();
  const [points, setPoints] = useState(0);
  const { t } = useContext(i18nContext);
  const [badgeFilterCss, setBadgeFilterCss] = useState(
    `${styles.filterBronze}`
  );
  const [displayCheckLogo, setDisplayCheckLogo] = useState(false);
  const setFilterBadgesLevel = useCallback(() => {
    if (points === 1) setBadgeFilterCss(`${styles.filterSilver}`);
    if (points === 2) setBadgeFilterCss(`${styles.filterGold}`);
    if (points >= 3) setBadgeFilterCss(`${styles.filterDiamond}`);
  }, [points]);

  useEffect(() => {
    if (countTopics > 3) {
      setPoints(3 + (userAgency === undefined ? 0 : 1));
    } else {
      setPoints(countTopics + (userAgency === undefined ? 0 : 1));
    }
    setpercentageBarValue((points / 4) * 100);
  }, [countTopics, userAgency, points, displayCheckLogo]);

  useEffect(() => {
    setFilterBadgesLevel();
    if (points >= 4) setDisplayCheckLogo(true);
  }, [points, setFilterBadgesLevel]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-dark-light p-4 mt-4 -mr-4 -ml-4 mb-0"
          : "bg-light-light p-4 mt-4 -mr-4 -ml-4 mb-0"
      }`}
    >
      <div className="flex flex-row items-stretch ">
        <Image
          className={badgeFilterCss}
          src={src}
          alt={"Filter"}
          width="45"
          height="45"
        />
        <div className="p-2 pl-4 text-l">
          <p className="font-extrabold text-xl mt-2">
            {t("statistics.ProfileCompTitle")}
          </p>
          <p className="mt-1.5 mb-2">{t("statistics.ProfileCompDesc")}</p>
        </div>
      </div>
      <div className="flex flex-row">
        <ProgressBar percentage={percentageBarValue} />
        <p className="pl-4">{points}/4</p>
        {displayCheckLogo ? (
          <Image
            className="pl-2"
            src="/img/badges/check.svg"
            alt={"Check"}
            width="20"
            height="20"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
