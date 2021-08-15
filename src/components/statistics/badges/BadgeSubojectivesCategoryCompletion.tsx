import React, { useEffect } from "react";
import Image from "next/image";
import { useState, useContext } from "react";
import { useDarkMode } from "../../../utils/darkMode";
import { ProgressBar } from "../progressBar/ProgressBar";
import { i18nContext } from "../../../utils/i18nContext";
import { useDarkMode } from "../../../utils/darkMode";

//export const BadgeSubojectivesCategoryCompletion = ({ props: {themeToCompare, indexSkillCount, datas, src, titleSubobjective, descriptionSubobjective }, }: BadgeSubojectivesCategoryCompletionProps) => {
export const BadgeSubojectivesCategoryCompletion = ({
  themeToCompare,
  datas,
  src,
  titleSubobjective,
  descriptionSubobjective,
  countSkills,
}) => {
  const [step, setStep] = useState([]);
  const [skillsNumber, setSkillsNumber] = useState(0);
  const { t } = useContext(i18nContext);
  const [max, setMax] = useState(0);
  const [percentageBarValue, setpercentageBarValue] = useState(0);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    setSkillsNumber(countSkills);
  }, [countSkills]);
  useEffect(() => {
    getStepsByCategory();
  }, [countSkills]);

  useEffect(() => {
    setMax(Math.max(...step) + 5);
    setpercentageBarValue((skillsNumber / max) * 100);
  }, [max, skillsNumber]);
  const getStepsByCategory = () => {
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
