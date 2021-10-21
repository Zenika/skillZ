import React, { useContext } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import CommonPage from "../../../components/CommonPage";
import CustomSelect from "../../../components/CustomSelect";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useDarkMode } from "../../../utils/darkMode";
import { Statistics } from "../../../components/profile/statistics/Statistics";
import { userInfosQueries } from "../../../graphql/queries/userInfos";
import PreferedTopics from "../../../components/profile/PreferedTopics";

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
  const { user } = useAuth0();
  const router = useRouter();
  const { context } = router.query;
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const { data, error, refetch } = useQuery<GetUserAgencyAndAllAgenciesResult>(
    userInfosQueries.USER_INFOS,
    {
      variables: { email: user?.email },
    }
  );
  const [insertUser] = useMutation(userInfosQueries.INSERT_USER_MUTATION);
  insertUser({
    variables: {
      email: user?.email,
      name: user?.name,
      picture: user?.picture,
    },
  });

  const userAgency =
    error || !data?.User[0]?.UserLatestAgency?.agency
      ? undefined
      : data?.User[0]?.UserLatestAgency?.agency;
  const agencies =
    error || data?.Agency.length <= 0
      ? []
      : data?.Agency.map((agency) => agency.name);
  const topics = error || data?.Topic.length <= 0 ? [] : data?.Topic;
  const onboarding =
    data?.Topic.length <= 0 ||
    data?.Agency.length <= 0 ||
    !data?.User[0]?.UserLatestAgency?.agency;
  const infoUser = data?.User[0];
  const userAchievements =
    data?.UserAchievements.length <= 0 ? undefined : data?.UserAchievements;
  const skillsDatas = data?.Category;
  const [upsertAgency] = useMutation(userInfosQueries.UPSERT_AGENCY_MUTATION);
  const updateAgency = (agency: string) => {
    upsertAgency({ variables: { email: user?.email, agency } });
  };

  return (
    <CommonPage page={"profile"} faded={false} context={context}>
      <div className="flex flex-row justify-center mt-4 mb-20">
        <div className="flex flex-col justify-center max-w-screen-md w-full p-4">
          {onboarding ? (
            <div className="flex flex-col justify-center rounded-lg bg-light-dark dark:bg-dark-dark my-2 p-2">
              <div className="flex flex-row justify-center">
                <div className="p-2">{t("myProfile.onboarding")}</div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-row justify-start">
            <Image
              className="w-16 h-16 rounded-full"
              height="64"
              width="64"
              src={user?.picture || ""}
            />
            <div className="flex flex-col mx-4 justify-center">
              <span>{infoUser?.name}</span>
            </div>
          </div>
          <div
            className={`${
              darkMode
                ? "flex flex-col justify-around rounded-lg bg-dark-dark my-2 p-2"
                : "flex flex-col justify-around rounded-lg bg-lidht-med my-2 p-2"
            }`}
          >
            <div className="p-2 text-xl">{t("myProfile.agency")}</div>
            <CustomSelect
              choices={agencies}
              selectedChoice={userAgency}
              placeholder={t("myProfile.selectPlaceholder")}
              onChange={(value: string) => updateAgency(value)}
            />
          </div>
          <PreferedTopics
            topics={topics}
            refetch={refetch}
            user={data?.User}
            readOnly={true}
          ></PreferedTopics>
          {skillsDatas ? (
            <Statistics
              userAchievements={userAchievements}
              skillsDatas={skillsDatas}
              countTopics={data?.UserTopic_aggregate.aggregate.count}
              userAgency={userAgency}
              myStatistics={true}
            />
          ) : (
            <></>
          )}
          <div className="flex flex-col justify-center my-2 p-2">
            <div className="flex flex-row justify-center">
              <Link href={"/"}>
                <span className="p-2 px-4 gradient-red rounded-full text-white cursor-pointer">
                  {t("myProfile.confirm")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CommonPage>
  );
};

export default withAuthenticationRequired(Profile);
