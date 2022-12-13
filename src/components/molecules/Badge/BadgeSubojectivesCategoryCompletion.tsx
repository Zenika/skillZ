import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { config } from "../../../env";
import { useDarkMode } from "../../../utils/darkMode";
import { i18nContext } from "../../../utils/i18nContext";
import Button from "../../atoms/Button";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import styles from "./badgeLevels.module.css";

export const BadgeSubojectivesCategoryCompletion = ({
  label,
  datas,
  src,
  countSkills,
  myStatistics,
}) => {
  const [step, setStep] = useState([0]);
  const [skillsNumber, setSkillsNumber] = useState(0);
  const { push } = useRouter();
  const [percentageBarBronze, setPercentageBarBronze] = useState(0);
  const [percentageBarSilver, setPercentageBarSilver] = useState(0);
  const [percentageBarGold, setPercentageBarGold] = useState(0);
  const [percentageBarDiamond, setPercentageBarDiamond] = useState(0);
  const { darkMode } = useDarkMode();
  const { t } = useContext(i18nContext);
  const [badgeFilterCss, setBadgeFilterCss] = useState(
    `${styles.filterBronze}`
  );

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
    //Silver
    if (skillsNumber >= 10 && skillsNumber < 20) {
      setPercentageBarBronze(100);
      setPercentageBarSilver((skillsNumber - 10) * 10);
      setBadgeFilterCss(`${styles.filterSilver}`);
    }
    //Gold
    else if (skillsNumber >= 20 && skillsNumber < 30) {
      setPercentageBarBronze(100);
      setPercentageBarSilver(100);
      setPercentageBarGold((skillsNumber - 20) * 10);
      setBadgeFilterCss(`${styles.filterGold}`);
    }
    //Diamond
    else if (skillsNumber >= 30) {
      setPercentageBarBronze(100);
      setPercentageBarSilver(100);
      setPercentageBarGold(100);
      setPercentageBarDiamond((skillsNumber - 30) * 10);
      setBadgeFilterCss(`${styles.filterDiamond}`);
    }
    //Bronze
    else setPercentageBarBronze(skillsNumber * 10);
  }, [skillsNumber]);

  useEffect(() => {
    setSkillsNumber(countSkills);
  }, [countSkills]);

  useEffect(() => {
    getStepsByCategory();
  }, [countSkills, getStepsByCategory]);

  useEffect(() => {
    setFilterBadgesLevel();
  }, [skillsNumber, setFilterBadgesLevel, step]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-dark-light p-4 mt-2 mb-4 rounded-md"
          : "bg-light-light p-4 mt-2 mb-4 rounded-md"
      }`}
    >
      <div className="flex flex-row place-content-between">
        <div className="p-1 text-l">
          <p className="font-extrabold text-xl mt-2">Graph {label}</p>
          {myStatistics && (
            <p className="mt-1.5 mb-2">
              {t("statistics.subobjectivesLegends")}
            </p>
          )}
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
        <ProgressBar percentage={percentageBarBronze} type="bronze" />
        <ProgressBar percentage={percentageBarSilver} type="silver" />
        <ProgressBar percentage={percentageBarGold} type="gold" />
        <ProgressBar percentage={percentageBarDiamond} type="diamond" />
      </div>

      {myStatistics && (
        <div className="flex flex-row-reverse">
          <Button type={"primary"} callback={() => push(link)}>
            {t("statistics.add").replace("%label%", label)}
          </Button>
        </div>
      )}
    </div>
  );
};
