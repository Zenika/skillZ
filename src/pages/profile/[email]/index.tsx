import React, { useContext, useEffect, useState } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import CommonPage from "../../../components/CommonPage";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Statistics } from "../../../components/profile/statistics/Statistics";
import {
  USER_INFOS,
  INSERT_USER_MUTATION,
} from "../../../graphql/queries/userInfos";
import ViewAgency from "../../../components/profile/ViewAgency";
import PreferedTopics from "../../../components/profile/PreferedTopics";
import Custom404 from "../../404";
type GetUserAgencyAndAllAgenciesResult = {
  User: {
    email: string;
    name: string;
    picture: string;
    UserLatestAgency: { agency: string };
  }[];
  Agency: { name: string }[];
  Topic: { id: string; name: string; UserTopics: { created_at: string }[] }[];
  UserAchievements: {
    created_at: string;
    points: number;
    label: string;
    userEmail: string;
    step: string;
    additionalInfo: string;
  }[];
  Category: {
    label: string;
    CurrentSkillsAndDesires_aggregate: {
      aggregate: {
        count: number;
      };
    };
    CurrentSkillsAndDesires: {
      name: string;
      skillLevel: number;
      desireLevel: number;
    }[];
  }[];
  UserTopic_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

const Profile = () => {
  const router = useRouter();
  const { t } = useContext(i18nContext);
  const { context, email: userEmail } = router.query;
  const { data, error } = useQuery<GetUserAgencyAndAllAgenciesResult>(
    USER_INFOS,
    {
      variables: { email: userEmail },
    }
  );
  const [insertUser] = useMutation(INSERT_USER_MUTATION);
  if (data?.User?.length > 0) {
    insertUser({
      variables: {
        email: data?.User[0]?.email,
        name: data?.User[0]?.name,
        picture: data?.User[0]?.picture,
      },
    });
  }
  const infoUser = data?.User[0];
  const userAgency =
    error || infoUser?.UserLatestAgency?.agency
      ? undefined
      : infoUser?.UserLatestAgency?.agency;
  const userAchievements =
    data?.UserAchievements.length <= 0 ? undefined : data?.UserAchievements;
  const skillsDatas = data?.Category;
  const topics = error || data?.Topic.length <= 0 ? [] : data?.Topic;

  return (
    <div>
      {data?.User?.length > 0 || !error ? (
        <CommonPage page={"profile"} faded={false} context={context}>
          <div className="flex flex-row justify-center mt-4 mb-20">
            <div className="flex flex-col justify-center max-w-screen-md w-full p-4">
              <div className="flex flex-row justify-start">
                <img
                  className="w-16 h-16 rounded-full"
                  height="64"
                  width="64"
                  src={infoUser?.picture || ""}
                />
                <div className="flex flex-col mx-4 justify-center">
                  <span>{infoUser?.name}</span>
                </div>
              </div>
              <ViewAgency
                agency={infoUser?.UserLatestAgency.agency}
              ></ViewAgency>
              <PreferedTopics
                topics={topics}
                refetch={null}
                user={data?.User}
                readOnly={true}
              ></PreferedTopics>
              {skillsDatas ? (
                <Statistics
                  userAchievements={userAchievements}
                  skillsDatas={skillsDatas}
                  countTopics={data?.UserTopic_aggregate.aggregate.count}
                  userAgency={userAgency}
                  myStatistics={false}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </CommonPage>
      ) : (
        <Custom404></Custom404>
      )}
    </div>
  );
};

export default withAuthenticationRequired(Profile);
