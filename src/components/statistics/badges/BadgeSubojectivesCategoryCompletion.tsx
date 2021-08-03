import React, { useEffect } from "react";
import Image from "next/image";
import { useState, useContext } from "react";
import { ProgressBar } from "../progressBar/ProgressBar";
import { i18nContext } from "../../../utils/i18nContext";
import { number } from "prop-types";
import { gql, useQuery } from "@apollo/client";

const GET_COUNT_SKILLS_DATA = gql`
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

type BadgeSubojectivesCategoryCompletionProps = {
  props: {
    themeToCompare: string;
    indexSkillCount: number;
    src: string;
    datas: {
      UserAchievements: {
        additionalInfo: string;
        step: number;
        label: string;
      }[];
    };
    titleSubobjective: string;
    descriptionSubobjective: string;
  };
};

//export const BadgeSubojectivesCategoryCompletion = ({ props: {themeToCompare, indexSkillCount, datas, src, titleSubobjective, descriptionSubobjective }, }: BadgeSubojectivesCategoryCompletionProps) => {
export const BadgeSubojectivesCategoryCompletion = ({
  themeToCompare,
  indexSkillCount,
  datas,
  src,
  titleSubobjective,
  descriptionSubobjective,
}) => {
  const [step, setStep] = useState([]);
  const [skillsNumber, setSkillsNumber] = useState(0);
  const { t } = useContext(i18nContext);
  const [max, setMax] = useState(0);
  const [percentageBarValue, setpercentageBarValue] = useState(0);
  let errorMsg = "Error: ";
  const {
    data: countSkills,
    error,
    loading,
  } = useQuery<SkillsDataResult>(GET_COUNT_SKILLS_DATA, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (countSkills) {
      setSkillsNumber(
        countSkills.Category[indexSkillCount].CurrentSkillsAndDesires_aggregate
          .aggregate.count
      );
    }
  }, [countSkills]);
  useEffect(() => {
    getStepsByCategory();
  }, [countSkills]);

  useEffect(() => {
    setMax(Math.max(...step) + 5);
    setpercentageBarValue((skillsNumber / max) * 100);
  }, [step, skillsNumber]);
  const getStepsByCategory = () => {
    for (let i = 0; i < datas.UserAchievements.length; i++) {
      if (
        datas.UserAchievements[i].label.localeCompare("categoryCompletion") == 0
      ) {
        if (
          datas.UserAchievements[i].additionalInfo.localeCompare(
            themeToCompare
          ) == 0
        ) {
          setStep((step) => [...step, datas.UserAchievements[i].step]);
        }
        //step.push(datas.UserAchievements[i].step);
      }
    }
    return;
  };
  if (loading) {
    return "Loading...";
  }
  if (error) {
    return errorMsg.concat(error.name, ", Message: ", error.message);
  }

  return (
    <div className="bg-dark-light p-4 mt-4 -mr-4 -ml-4 mb-0">
      <div className="flex flex-row items-stretch ">
      <Image
        className="object-fill h-48 w-full object-center pb-5"
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
      </div>
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
