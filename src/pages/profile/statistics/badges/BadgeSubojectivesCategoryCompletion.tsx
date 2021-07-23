import React from "react";
import styles from "./BadgeSubojectives.module.css";
import Image from "next/image";
import { useState,useContext } from "react";
import { ProgressBar } from "../progressBar";
import { i18nContext } from "../../../../utils/i18nContext";
import { number } from "prop-types";

export const BadgeSubojectivesCategoryCompletion = ({ datas, src }) => {
  let pointsGlobal = 0; //to fix in bdd. always be at 20, but should be updated if sum of * step > 20
  let stepTools = [];
  let stepLanguagesAndFrameworks = [];
  let stepPlatforms = [];
  const { t } = useContext(i18nContext);
  let stepTechnicsAndMethods = [];

  const createNewMapOfDatas = () => {
    let newMapOfDatas = [];

    for (let i = 0; i < (datas.UserAchievements.length); i++) {
      if (datas.UserAchievements[i].label.localeCompare("categoryCompletion") == 0) {
        newMapOfDatas.push(datas.UserAchievements[i]);
        if (datas.UserAchievements[i].points > pointsGlobal)
          pointsGlobal = datas.UserAchievements[i].points;
        if (datas.UserAchievements[i].additionalInfo.localeCompare("tools") == 0)
          stepTools.push(datas.UserAchievements[i].step);
        if (datas.UserAchievements[i].additionalInfo.localeCompare("languages-and-frameworks") == 0)
          stepLanguagesAndFrameworks.push(datas.UserAchievements[i].step);
        if (datas.UserAchievements[i].additionalInfo.localeCompare("platforms") == 0)
          stepPlatforms.push(datas.UserAchievements[i].step);
        if (datas.UserAchievements[i].additionalInfo.localeCompare("technics-and-methods") == 0)
          stepTechnicsAndMethods.push(datas.UserAchievements[i].step);
    }
  }
  return newMapOfDatas;
  }
  createNewMapOfDatas();
  const maxTools = Math.max(...stepTools);
  const maxLanguagesAndFrameworks = Math.max(...stepLanguagesAndFrameworks);
  const maxPlatforms = Math.max(...stepPlatforms);
  const maxTechnicsAndMethods = Math.max(...stepTechnicsAndMethods);

  console.log(maxLanguagesAndFrameworks)
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
      <Image
        className="object-fill h-48 w-full object-center"
        src={src}
        width="45"
        height="45"
      />
      <span>{t("subojectives.subObjectivesCategoryCompletionLanguageAndFrameworks")}</span>
      <p>{t("subojectives.explicationSubObjectivesCategoryCompletion1")}</p>
      <p>{t("subojectives.explicationSubObjectivesCategoryCompletion2")}</p>
      <p>{t("subojectives.explicationSubObjectivesCategoryCompletionLanguageAndFrameworks")}</p>
      <ProgressBar percentage={30} />
      <p>{maxLanguagesAndFrameworks}/{pointsGlobal}</p>
    </div>
  );
};

/*export const BadgeRecurrency = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
        <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};

export const BadgeSkillsEntered = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
        <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};

export const BadgeAnecdotesAdded = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
        <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};

export const BadgeEvents = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
        <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};

export const BadgeTalks = () => {
  return (
    <div className={styles.BadgeProfileSubObjectivesEnd}>
        <Image
        className="object-fill h-48 w-full object-center"
        src="/img/badges/medaille.svg"
        width="35"
        height="35"
      />
    </div>
  );
};*/
