import { useMutation, useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import CommonPage from "../../components/CommonPage";
import CustomSelect from "../../components/CustomSelect";
import CertificationModal from "../../components/profile/certifications/CertificationModal";
import CertificationsList from "../../components/profile/certifications/CertificationsList";
import PreferedTopics from "../../components/profile/PreferedTopics";
import { Statistics } from "../../components/profile/statistics/Statistics";
import { GetUserAgencyAndAllAgenciesQuery } from "../../generated/graphql";
import {
  DELETE_USER_CERTIFICATION_MUTATION,
  INSERT_USER_MUTATION,
  UPSERT_USER_AGENCY_MUTATION,
  UPSERT_USER_CERTIFICATION_MUTATION,
} from "../../graphql/mutations/userInfos";
import { GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY } from "../../graphql/queries/userInfos";
import { useDarkMode } from "../../utils/darkMode";
import { i18nContext } from "../../utils/i18nContext";
import { UserCertification } from "../../utils/types";
import { useNotification } from "../../utils/useNotification";

const Profile = () => {
  const { user } = useAuth0();
  const router = useRouter();
  const { context } = router.query;
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const { data, error, refetch } = useQuery<GetUserAgencyAndAllAgenciesQuery>(
    GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY,
    {
      variables: { email: user?.email },
      fetchPolicy: "network-only",
    }
  );
  const [userInserted, setUserInserted] = useState(false);
  const [insertUser] = useMutation(INSERT_USER_MUTATION);
  const insertUserIfNeeded = () => {
    if (!userInserted) {
      return insertUser({
        variables: {
          email: user?.email,
          name: user?.name,
          picture: user?.picture,
        },
      }).then(() => {
        setUserInserted(true);
      });
    }
    return Promise.resolve();
  };

  const [certModalOpened, setCertModalOpened] = useState(false);

  const userAgency =
    error || !data?.User[0]?.UserLatestAgency?.agency
      ? undefined
      : data?.User[0]?.UserLatestAgency?.agency;
  const agencies =
    error || data?.Agency.length <= 0
      ? []
      : data?.Agency.map((agency) => agency.name);
  const topics = error || data?.Topic.length <= 0 ? [] : data?.Topic;
  const certifications =
    error || data?.Certification.length <= 0 ? [] : data?.Certification;
  const userCertifications =
    error || data?.UserCertification.length <= 0 ? [] : data?.UserCertification;
  const onboarding =
    data?.Topic.length <= 0 ||
    data?.Agency.length <= 0 ||
    !data?.User[0]?.UserLatestAgency?.agency;
  const infoUser = data?.User[0];
  const userAchievements =
    data?.UserAchievements.length <= 0 ? undefined : data?.UserAchievements;
  const skillsDatas = data?.Category;
  const [upsertAgency] = useMutation(UPSERT_USER_AGENCY_MUTATION);
  const updateAgency = (agency: string) => {
    insertUserIfNeeded().then(() => {
      upsertAgency({ variables: { email: user?.email, agency } });
    });
  };
  const [selectedUserCert, setSelectedUserCert] = useState<UserCertification>();
  const [upsertCertificationMutation] = useMutation(
    UPSERT_USER_CERTIFICATION_MUTATION,
    {
      onCompleted: async () => {
        useNotification(t("myProfile.updateUserCertSuccess"), "green", 5000);
        refetch();
        setCertModalOpened(false);
        setSelectedUserCert(undefined);
      },
      onError: async () => {
        useNotification(`${t("myProfile.updateUserCertError")}`, "red", 5000);
      },
    }
  );
  const updateCertification = (userCert: UserCertification) => {
    insertUserIfNeeded().then(() => {
      upsertCertificationMutation({
        variables: {
          email: user?.email,
          certId: userCert.Certification.id,
          obtained: userCert.obtained,
          from: userCert.from,
          to: userCert.to,
          url: userCert.url,
        },
      });
    });
  };
  const [deleteCertificationMutation] = useMutation(
    DELETE_USER_CERTIFICATION_MUTATION,
    {
      onCompleted: async () => {
        useNotification(t("myProfile.deleteUserCertSuccess"), "green", 5000);
        refetch();
        setCertModalOpened(false);
        setSelectedUserCert(undefined);
      },
      onError: async () => {
        useNotification(`${t("myProfile.deleteUserCertError")}`, "red", 5000);
      },
    }
  );
  const deleteCertification = (userCert: UserCertification) => {
    insertUserIfNeeded().then(() => {
      deleteCertificationMutation({
        variables: {
          email: user?.email,
          certId: userCert.Certification.id,
          from: userCert.from,
        },
      });
    });
  };

  return (
    <CommonPage page={"profile"} faded={certModalOpened} context={context}>
      <div
        className={`flex flex-row justify-center mt-4 mb-20 ${
          certModalOpened ? "opacity-25" : ""
        }`}
      >
        <div
          className={`flex flex-col justify-center max-w-screen-md w-full p-4`}
        >
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
            {!userAgency && (
              <div className="border-l-4 p-4 mb-4 border-dark-red" role="alert">
                <p className="font-bold text-dark-red">
                  {t("createProfile.warningAgencyTitle")}
                </p>
                <p>{t("createProfile.warningAgency")}</p>
              </div>
            )}
            <CustomSelect
              labelFn={(x) => x}
              keyFn={(x) => x}
              choices={agencies}
              selectedChoice={userAgency}
              placeholder={t("myProfile.selectPlaceholder")}
              onChange={(value: string) => updateAgency(value)}
            />
            {onboarding && (
              <div className="flex justify-center">
                <button
                  className="rounded-full gradient-red text-white py-2 px-10 mb-4"
                  onClick={() => userInserted && !userAgency && router.reload()}
                >
                  {t("myProfile.onboardingButton")}
                </button>
              </div>
            )}
          </div>
          {userInserted ||
            (userAgency && (
              <div>
                <PreferedTopics
                  topics={topics}
                  refetch={refetch}
                  user={data?.User[0]}
                  readOnly={false}
                ></PreferedTopics>
                <CertificationsList
                  userCertifications={userCertifications}
                  onUserCertificationSelect={(userCert) => {
                    setCertModalOpened(true);
                    setSelectedUserCert(userCert);
                  }}
                  onUserCertificationAdd={() => setCertModalOpened(true)}
                  readOnly={false}
                ></CertificationsList>
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
              </div>
            ))}
        </div>
      </div>
      <div
        className={`z-20 fixed inset-y-0 right-0 h-screen w-full ${
          certModalOpened ? "" : "hidden"
        }`}
      >
        {certModalOpened ? (
          <div className="flex flex-row justify-center">
            <CertificationModal
              userCertificationRef={selectedUserCert}
              certificationsRef={certifications}
              onCancel={() => {
                setCertModalOpened(false);
                setSelectedUserCert(undefined);
              }}
              onConfirm={(userCertification) =>
                updateCertification(userCertification)
              }
              onDelete={(userCertification) =>
                deleteCertification(userCertification)
              }
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </CommonPage>
  );
};

export default withAuthenticationRequired(Profile);
