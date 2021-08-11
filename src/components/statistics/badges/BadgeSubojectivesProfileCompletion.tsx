import React, { useContext } from "react";
import Image from "next/image";
import { i18nContext } from "../../../utils/i18nContext";
import { ProgressBar } from "../progressBar/ProgressBar";

export const BadgeSubojectivesProfileCompletion = ({ src }) => {
  const { t } = useContext(i18nContext);
  return (
    <div className="bg-dark-light p-4 mt-4 -mr-4 -ml-4 mb-0">
      <div className="flex flex-row items-stretch ">
        <Image
          className="object-fill h-48 w-full object-center"
          src={src}
          width="35"
          height="35"
        />
        <div className="p-2 pl-4 text-l">
          <p className="font-extrabold text-xl mt-2">
            {t("subojectives.subObjectiveProfile")}
          </p>
          <p className="mt-1.5 mb-2">
            {t("subojectives.explicationSubObjectiveProfile")}
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <ProgressBar percentage={0} />
        <p className="pl-4">0/3</p>
      </div>
    </div>
  );
};
