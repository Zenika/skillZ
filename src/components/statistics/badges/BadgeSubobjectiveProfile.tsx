import React, { useEffect } from "react";
import Image from "next/image";
import { useState, useContext } from "react";
import { useDarkMode } from "../../../utils/darkMode";
import { ProgressBar } from "../progressBar/ProgressBar";
import { i18nContext } from "../../../utils/i18nContext";

//export const BadgeSubojectivesCategoryCompletion = ({ props: {themeToCompare, indexSkillCount, datas, src, titleSubobjective, descriptionSubobjective }, }: BadgeSubojectivesCategoryCompletionProps) => {
export const BadgeSubojectivesProfileCompletion = ({ src, datas, countTopics, userAgency }) => {
    const { t } = useContext(i18nContext);
  const [step, setStep] = useState([]);
  const [percentageBarValue, setpercentageBarValue] = useState(0);
  const { darkMode } = useDarkMode();
  const [ points, setPoints ] = useState(0);
  const [badgeFilterCss, setBadgeFilterCss] = useState();

    useEffect(() => {
        if (countTopics > 3)
            countTopics = 3;
        setPoints(countTopics + (userAgency === undefined ? 0 : 1));
    }, [countTopics, userAgency]);
    const getStepPreferedTopics = () => {
        setStep((step) => [
            ...step,
            ...datas
              .filter(
                (d) =>
                  d.label === "profileCompletion" &&
                  d.additionalInfo === "preferedTopics"
              )
              .map((s) => s.step),
          ]);
          return;
    };
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
          className="filter filter-brightness-88 filter-saturate-1685 filter-sepia-20 filter-contrast-81 object-fill h-48 w-full object-center pb-5"
          src={src}
          width="45"
          height="45"
        />
        <div className="p-2 pl-4 text-l">
          <p className="font-extrabold text-xl mt-2">
            {t("subojectives.subObjectivesProfileCompletion")}
          </p>
          <p className="mt-1.5 mb-2">
            {t("subojectives.explicationProfileCompletion")}
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <ProgressBar percentage={percentageBarValue} />
        <p className="pl-4">{points}/0</p>
      </div>
    </div>
  );
};
