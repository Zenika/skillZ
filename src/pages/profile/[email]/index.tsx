import { useQuery } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { GoGraph } from "react-icons/go";
import Button from "../../../components/atoms/Button";
import CertificationsList from "../../../components/molecules/CertificationsList";
import Loading from "../../../components/molecules/Loading";
import { Statistics } from "../../../components/molecules/Statistics";
import Topics from "../../../components/molecules/Topics";
import ViewAgency from "../../../components/molecules/ViewAgency";
import CommonPage from "../../../components/templates/CommonPage";
import { config } from "../../../env";
import { GetUserAgencyAndAllAgenciesQuery } from "../../../generated/graphql";
import { GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY } from "../../../graphql/queries/userInfos";
import { i18nContext } from "../../../utils/i18nContext";
import Custom404 from "../../404";

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
            <Topics
              readOnly
              topics={data.Topic.map((topic) => {
                return { id: topic.id, name: topic.name };
              })}
              selectedTopics={data.UserTopic.map((t) => t.topicId)}
              title={t("userProfile.topics")}
            />
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

export default withAuthenticationRequired(Profile, {
  loginOptions: { prompt: "login" },
});
