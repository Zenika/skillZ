import React from "react";
import styles from "./BadgeSubojectives.module.css";
import Image from "next/image";
import { useState,useContext } from "react";
import { ProgressBar } from "../progressBar";
import { i18nContext } from "../../../../utils/i18nContext";
import { number } from "prop-types";
import { gql, useQuery } from "@apollo/client";

const GET_COUNT_SKILLS_DATA = gql `
query getDataForAchievments {
  Category {
    CurrentSkillsAndDesires_aggregate {
      aggregate {
        count
      }
    }
  }
}
`;

type SkillsDataResult = {
  Category: {
    CurrentSkillsAndDesires_aggregate: {
      aggregate: {
        count: number;
      };
    };
  }[];
};

export const BadgeSubojectivesCategoryCompletion = ({ themeToCompare, indexSkillCount, datas, src, titleSubobjective, descriptionSubobjective }) => {
  let pointsGlobal = 0; //to fix in bdd. always be at 20, but should be updated if sum of * step > 20
  let step = [];
  const { t } = useContext(i18nContext);
  let errorMsg = "Error: ";
  const {data: countSkills, error, loading} = useQuery<SkillsDataResult>(GET_COUNT_SKILLS_DATA);

  if(loading){
    return 'Loading...';
  }
  if(error){
    return errorMsg.concat(error.name, ", Message: ", error.message);
  }

  const createNewMapOfDatas = () => {

    for (let i = 0; i < (datas.UserAchievements.length); i++) {
      if (datas.UserAchievements[i].label.localeCompare("categoryCompletion") == 0) {
        if (datas.UserAchievements[i].points > pointsGlobal)
          pointsGlobal = datas.UserAchievements[i].points;
        if (datas.UserAchievements[i].additionalInfo.localeCompare(themeToCompare) == 0)
          step.push(datas.UserAchievements[i].step);
    }
  }
  return ;
  }
  createNewMapOfDatas();
  const max = Math.max(...step);
  return (
    <div className={styles.BadgeProfileSubObjectivesMiddle}>
      <Image
        className="object-fill h-48 w-full object-center"
        src={src}
        width="45"
        height="45"
      />
      <span>{titleSubobjective}</span>
      <p>{descriptionSubobjective}</p>
      <ProgressBar percentage={30} />
      <p>{countSkills.Category[indexSkillCount].CurrentSkillsAndDesires_aggregate.aggregate.count}/{max}</p>
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
