import React, { useContext, useEffect, useState } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CommonPage from "../../../components/CommonPage";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Statistics } from "../../../components/profile/statistics/Statistics";
import { GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY } from "../../../graphql/queries/userInfos";
import ViewAgency from "../../../components/profile/ViewAgency";
import PreferedTopics from "../../../components/profile/PreferedTopics";
import CertificationsList from "../../../components/profile/certifications/CertificationsList";
import { UserCertification } from "../../../utils/types";
import Custom404 from "../../404";
import { GetUserAgencyAndAllAgenciesQuery } from "../../../generated/graphql";
import { INSERT_USER_MUTATION } from "../../../graphql/mutations/userInfos";
import { config } from "../../../env";
import { GoGraph } from "react-icons/go";

const Profile = () => {
  const router = useRouter();
  const { t } = useContext(i18nContext);
  const { context, email: userEmail } = router.query;
  const { push } = useRouter();
  const { data, error, loading } = useQuery<GetUserAgencyAndAllAgenciesQuery>(
    GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY,
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
    error || !infoUser?.UserLatestAgency?.agency
      ? undefined
      : infoUser?.UserLatestAgency?.agency;
  const userAchievements =
    data?.UserAchievements.length <= 0 ? undefined : data?.UserAchievements;
  const skillsDatas = data?.Category;
  const topics = error || data?.Topic.length <= 0 ? [] : data?.Topic;
  const userCertifications =
    error || data?.UserCertification.length <= 0 ? [] : data?.UserCertification;

  const linkRadar = new URL(
    `${config.nextPublicBaseUrl}/profile/${infoUser?.email}/radars`
  );
  console.log("infoUser", infoUser);

  return (
    <div>
      {(data?.User?.length > 0 && !error) || loading ? (
        <CommonPage page={"profile"} faded={false} context={context}>
          <div className="flex flex-row justify-center mt-4 mb-20">
            <div className="flex flex-col justify-center max-w-screen-md w-full p-4">
              <div className="flex flex-row place-content-between mb-2">
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
                <button
                  className="px-5 gradient-red rounded-full disabled:opacity-25"
                  onClick={() => push(linkRadar)}
                >
                  <div className="grid justify-items-center">
                    <GoGraph></GoGraph>
                    See radars
                  </div>
                </button>
              </div>
              {infoUser?.UserLatestAgency?.agency ? (
                <ViewAgency
                  agency={infoUser?.UserLatestAgency.agency}
                ></ViewAgency>
              ) : (
                ""
              )}
              <PreferedTopics
                topics={topics}
                refetch={null}
                user={data?.User[0]}
                readOnly={true}
              ></PreferedTopics>
              <CertificationsList
                userCertifications={userCertifications}
                readOnly={true}
              ></CertificationsList>
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
        <Custom404 />
      )}
    </div>
  );
};

export default withAuthenticationRequired(Profile);
