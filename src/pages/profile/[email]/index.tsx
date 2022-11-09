import { useQuery } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { GoGraph } from "react-icons/go";
import Button from "../../../components/Button";
import CommonPage from "../../../components/CommonPage";
import Loading from "../../../components/Loading";
import CertificationsList from "../../../components/profile/certifications/CertificationsList";
import PreferedTopics from "../../../components/profile/PreferedTopics";
import { Statistics } from "../../../components/profile/statistics/Statistics";
import ViewAgency from "../../../components/profile/ViewAgency";
import { config } from "../../../env";
import { GetUserAgencyAndAllAgenciesQuery } from "../../../generated/graphql";
import { GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY } from "../../../graphql/queries/userInfos";
import Custom404 from "../../404";
import { useContext } from "react";
import { i18nContext } from "../../../utils/i18nContext";

const Profile = () => {
  const { push, query } = useRouter();
  const { email: userEmail } = query;
  const { t } = useContext(i18nContext);

  /*
   * QUERIES
   */
  const { data, error, loading } = useQuery<GetUserAgencyAndAllAgenciesQuery>(
    GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY,
    {
      variables: { email: userEmail },
    }
  );

  const infoUser = data?.User[0];
  const userAchievements =
    data?.UserAchievements.length <= 0 ? undefined : data?.UserAchievements;
  const skillsDatas = data?.Category;
  const topics = error || data?.Topic.length <= 0 ? [] : data?.Topic;
  const userCertifications =
    error || data?.UserCertification.length <= 0 ? [] : data?.UserCertification;

  const linkRadar = new URL(
    `${config.nextPublicBaseUrl}/profile/${infoUser?.email}/graphs`
  );

  if (loading) {
    return <Loading />;
  } else if (!data?.User?.length || error) {
    return <Custom404 />;
  }

  return (
    <CommonPage page={"profile"}>
      <div className="flex flex-row justify-center mt-4 mb-20">
        <div className="flex flex-col justify-center max-w-screen-md w-full p-4">
          <div className="flex flex-row place-content-between mb-2">
            <div className="flex flex-row justify-start">
              <Image
                alt={infoUser?.name}
                className="w-16 h-16 rounded-full"
                height="64"
                width="64"
                src={infoUser?.picture || ""}
              />
              <div className="flex flex-col mx-4 justify-center">
                <span>{infoUser?.name}</span>
              </div>
            </div>
            <Button
              type={"primary"}
              style={"contained"}
              callback={() => push(linkRadar)}
              icon={<GoGraph />}
            >
              {t("userProfile.seeRadars")}
            </Button>
          </div>
          {infoUser?.UserLatestAgency?.agency && (
            <ViewAgency agency={infoUser?.UserLatestAgency.agency}></ViewAgency>
          )}
          <div>
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
            {skillsDatas && (
              <Statistics
                userAchievements={userAchievements}
                skillsDatas={skillsDatas}
                myStatistics={false}
              />
            )}
          </div>
        </div>
      </div>
    </CommonPage>
  );
};

export default withAuthenticationRequired(Profile);
