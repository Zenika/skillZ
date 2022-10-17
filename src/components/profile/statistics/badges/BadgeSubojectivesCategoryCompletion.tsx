import Image from "next/image";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { useDarkMode } from "../../../../utils/darkMode";
import { ProgressBar } from "../progressBar/ProgressBar";
import styles from "./badgeLevels.module.css";
import { useRouter } from "next/router";
import { i18nContext } from "../../../../utils/i18nContext";
import { config } from "../../../../env";
import { Transform } from "stream";

export const BadgeSubojectivesCategoryCompletion = ({
  label,
  datas,
  src,
  countSkills,
  myStatistics,
}) => {
  const [step, setStep] = useState([0]);
  const [skillsNumber, setSkillsNumber] = useState(0);
  const [max, setMax] = useState(5);
  const { push } = useRouter();
  const [percentageBarValue, setpercentageBarValue] = useState(0);
  const { darkMode } = useDarkMode();
  const { t } = useContext(i18nContext);
  const [badgeFilterCss, setBadgeFilterCss] = useState(
    `${styles.filterBronze}`
  );
  const [displayCheckLogo, setDisplayCheckLogo] = useState(false);

  const getStepsByCategory = useCallback(() => {
    if (datas) {
      setStep((step) => [
        ...step,
        ...datas
          .filter(
            (d) =>
              d.label === "categoryCompletion" && d.additionalInfo === label
          )
          .map((s) => s.step),
      ]);
    }
    return;
  }, [datas, label]);
  const link = new URL(`${config.nextPublicBaseUrl}/skills/mine/${label}`);

  const setFilterBadgesLevel = useCallback(() => {
    if (skillsNumber >= 10 && skillsNumber < 20)
      setBadgeFilterCss(`${styles.filterSilver}`);
    if (skillsNumber >= 20 && skillsNumber < 30)
      setBadgeFilterCss(`${styles.filterGold}`);
    if (skillsNumber >= 30) setBadgeFilterCss(`${styles.filterDiamond}`);
  }, [skillsNumber]);

  useEffect(() => {
    setSkillsNumber(countSkills);
    if (countSkills >= 40) setDisplayCheckLogo(true);
  }, [countSkills]);

  useEffect(() => {
    getStepsByCategory();
  }, [countSkills, getStepsByCategory]);

  useEffect(() => {
    const maxVerif = Math.max(...step) + 5;
    if (isFinite(maxVerif)) {
      setMax(maxVerif);
      setpercentageBarValue((skillsNumber / max) * 100);
    } else setpercentageBarValue((skillsNumber / max) * 100);
    setFilterBadgesLevel();
  }, [max, skillsNumber, setFilterBadgesLevel, step]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-dark-light p-4 mt-4 -mr-4 -ml-4 mb-0"
          : "bg-light-light p-4 mt-4 -mr-4 -ml-4 mb-0"
      }`}
    >
      <div className="flex flex-row place-content-between">
        <div className="p-2 pl-4 text-l">
          <p className="font-extrabold text-xl mt-2">Graph {label}</p>
          <p className="mt-1.5 mb-2">{t("statistics.subobjectivesLegends")}</p>
        </div>
        <div className="flex mr-4 relative text-center">
          <Image
            className={badgeFilterCss}
            src={src}
            alt={"Filter"}
            width="60"
            height="60"
          />
          <p className="absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 font-bold text-black">
            {skillsNumber}
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <ProgressBar percentage={percentageBarValue} />
        <p className="pl-4">
          {skillsNumber}/{max}
        </p>
        {displayCheckLogo ? (
          <Image
            className="pl-2"
            src="/img/badges/check.svg"
            alt={"Badge"}
            width="20"
            height="20"
          />
        ) : (
          ""
        )}
      </div>

      {myStatistics && (
        <button
          className="rounded mt-4 ml-2 gradient-red"
          onClick={() => push(link)}
        >
          <span className="px-4 py-4 text-light-ultrawhite text-m">
            {t("statistics.add").replace("%label%", label)}
          </span>
        </button>
      )}
    </div>
  );
};
