import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { useDarkMode } from "../../../utils/darkMode";
import { ProgressBar } from "../progressBar/ProgressBar";
import styles from "./badgeLevels.module.css";

//export const BadgeSubojectivesCategoryCompletion = ({ props: {themeToCompare, indexSkillCount, datas, src, titleSubobjective, descriptionSubobjective }, }: BadgeSubojectivesCategoryCompletionProps) => {
export const BadgeSubojectivesCategoryCompletion = ({
  themeToCompare,
  datas,
  src,
  titleSubobjective,
  descriptionSubobjective,
  countSkills,
}) => {
  const [step, setStep] = useState([0]);
  const [skillsNumber, setSkillsNumber] = useState(0);
  const [max, setMax] = useState(5);
  const [percentageBarValue, setpercentageBarValue] = useState(0);
  const { darkMode } = useDarkMode();
  const [badgeFilterCss, setBadgeFilterCss] = useState(
    `${styles.filterBronze}`
  );
  const [displayCheckLogo, setDisplayCheckLogo] = useState(false);

  useEffect(() => {
    setFilterBadgesLevel();
  }, [skillsNumber]);

  useEffect(() => {
    setSkillsNumber(countSkills);
    if (countSkills >= 40) setDisplayCheckLogo(true);
  }, [countSkills]);
  useEffect(() => {
    getStepsByCategory();
  }, [countSkills]);

  useEffect(() => {
    const maxVerif = Math.max(...step) + 5;
    if (isFinite(maxVerif)) {
      setMax(maxVerif);
      setpercentageBarValue((skillsNumber / max) * 100);
    } else setpercentageBarValue((skillsNumber / max) * 100);
  }, [max, skillsNumber]);
  const getStepsByCategory = () => {
    if (datas) {
      setStep((step) => [
        ...step,
        ...datas
          .filter(
            (d) =>
              d.label === "categoryCompletion" &&
              d.additionalInfo === themeToCompare
          )
          .map((s) => s.step),
      ]);
    }
    return;
  };

  const setFilterBadgesLevel = () => {
    if (skillsNumber >= 10 && skillsNumber < 20)
      setBadgeFilterCss(`${styles.filterSilver}`);
    if (skillsNumber >= 20 && skillsNumber < 30)
      setBadgeFilterCss(`${styles.filterGold}`);
    if (skillsNumber >= 30) setBadgeFilterCss(`${styles.filterDiamond}`);
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-dark-light p-4 mt-4 -mr-4 -ml-4 mb-0"
          : "bg-light-light p-4 mt-4 -mr-4 -ml-4 mb-0"
      }`}
    >
      <div className="flex flex-row items-stretch">
        <Image
          /* className="filter filter-brightness-88 filter-saturate-1685 filter-sepia-20 filter-contrast-81 object-fill h-48 w-full object-center pb-5"
           */
          className={badgeFilterCss}
          src={src}
          width="45"
          height="45"
        />
        <div className="p-2 pl-4 text-l">
          <p className="font-extrabold text-xl mt-2">{titleSubobjective}</p>
          <p className="mt-1.5 mb-2">{descriptionSubobjective}</p>
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
