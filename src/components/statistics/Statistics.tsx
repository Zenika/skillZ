import React, { useContext, useEffect, useState } from "react";
import { i18nContext } from "../../utils/i18nContext";
import {
  BadgeSubojectivesCategoryCompletion,
  BadgeSubojectives,
} from "./badges";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const GET_DATA_FOR_ACHIEVEMENTS = gql`
  query getDataForAchievements {
    UserAchievements {
      additionalInfo
      created_at
      label
      points
      step
      userEmail
    }
  }
`;

type AchievementsResult = {
  UserAchievements: {
    created_at: string;
    points: number;
    label: string;
    userEmail: string;
    step: string;
    additionalInfo: string;
  }[];
};

export const Statistics = () => {
  const { t } = useContext(i18nContext);
  const { user, isLoading } = useAuth0();
  const { data, error, loading } = useQuery<AchievementsResult>(
    GET_DATA_FOR_ACHIEVEMENTS,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  if (loading)
    return (<div>Loading...</div>);
  if (error || !data) {
    console.error(`Error: ${error.name}, Message: ${error.message}`);
    return (<div>Error...</div>);
  }
  return (
    <div className="bg-dark-dark pb-4 pl-4 pr-4 mt-4 flex-col rounded">
      <h2 className="p-2 pt-4 text-2xl">{t("statistics.titleSection")}</h2>
        <BadgeSubojectivesCategoryCompletion
          themeToCompare="languages-and-frameworks"
          indexSkillCount="0"
          datas={data}
          src="/img/badges/medaille.svg"
          titleSubobjective={t(
            "subojectives.subObjectivesCategoryCompletionLanguageAndFrameworks"
          )}
          descriptionSubobjective={t(
            "subojectives.explicationSubObjectivesCategoryCompletionLanguageAndFrameworks"
          )}
        />
        <BadgeSubojectivesCategoryCompletion
          themeToCompare="platforms"
          indexSkillCount="1"
          datas={data}
          src="/img/badges/medaille.svg"
          titleSubobjective={t(
            "subojectives.subObjectivesCategoryCompletionPlateform"
          )}
          descriptionSubobjective={t(
            "subojectives.explicationSubObjectivesCategoryCompletionPlateform"
          )}
        />
        <BadgeSubojectivesCategoryCompletion
          themeToCompare="tools"
          indexSkillCount="2"
          datas={data}
          src="/img/badges/medaille.svg"
          titleSubobjective={t(
            "subojectives.subObjectivesCategoryCompletionTools"
          )}
          descriptionSubobjective={t(
            "subojectives.explicationSubObjectivesCategoryCompletionTools"
          )}
        />
        <BadgeSubojectivesCategoryCompletion
          themeToCompare="technics-and-methods"
          indexSkillCount="3"
          datas={data}
          src="/img/badges/medaille.svg"
          titleSubobjective={t(
            "subojectives.subObjectivesCategoryCompletionTechnicsAndMethod"
          )}
          descriptionSubobjective={t(
            "subojectives.explicationSubObjectivesCategoryCompletionTechnicsAndMethod"
          )}
        />
        <BadgeSubojectives src="/img/badges/medaille.svg" />
      </div>
  );
};
