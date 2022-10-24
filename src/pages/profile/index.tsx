import { useMutation, useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import CommonPage from "../../components/CommonPage";
import CustomSelect from "../../components/CustomSelect";
import ErrorPage from "../../components/ErrorPage";
import Loading from "../../components/Loading";
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
import { displayNotification } from "../../utils/displayNotification";
import { i18nContext } from "../../utils/i18nContext";
import { UserCertification } from "../../utils/types";

const Profile = () => {
  // HOOKS
  const { user } = useAuth0();
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();

  // CONTEXT
  const router = useRouter();

  // STATES
  const [userInserted, setUserInserted] = useState(false);
  const [certModalOpened, setCertModalOpened] = useState(false);
  const [selectedUserCert, setSelectedUserCert] = useState<UserCertification>();

  // QUERIES
  const { data, error, refetch, loading } =
    useQuery<GetUserAgencyAndAllAgenciesQuery>(
      GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY,
      {
        variables: { email: user?.email },
        fetchPolicy: "network-only",
      }
    );

  // MUTATIONS
  const [insertUser] = useMutation(INSERT_USER_MUTATION);
  const [upsertAgency] = useMutation(UPSERT_USER_AGENCY_MUTATION);
  const [upsertCertificationMutation] = useMutation(
    UPSERT_USER_CERTIFICATION_MUTATION
  );
  const [deleteCertificationMutation] = useMutation(
    DELETE_USER_CERTIFICATION_MUTATION
  );

  // CALLBACKS
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

  const updateAgency = (agency: string) => {
    insertUserIfNeeded().then(() => {
      upsertAgency({ variables: { email: user?.email, agency } });
      if (!onboarding) router.reload();
    });
  };

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
      })
        .then(() => {
          displayNotification(
            t("myProfile.updateUserCertSuccess"),
            "green",
            5000
          );
          refetch();
          setCertModalOpened(false);
          setSelectedUserCert(undefined);
        })
        .catch(() => {
          displayNotification(
            `${t("myProfile.updateUserCertError")}`,
            "red",
            5000
          );
        });
    });
  };

  const deleteCertification = (userCert: UserCertification) => {
    insertUserIfNeeded().then(() => {
      deleteCertificationMutation({
        variables: {
          email: user?.email,
          certId: userCert.Certification.id,
          from: userCert.from,
        },
      })
        .then(() => {
          displayNotification(
            t("myProfile.deleteUserCertSuccess"),
            "green",
            5000
          );
          refetch();
          setCertModalOpened(false);
          setSelectedUserCert(undefined);
        })
        .catch(() => {
          displayNotification(
            `${t("myProfile.deleteUserCertError")}`,
            "red",
            5000
          );
        });
    });
  };

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

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorPage />;
  } else {
    return (
      <CommonPage page={"profile"} faded={certModalOpened}>
        <div
          className={`flex flex-row justify-center mt-4 mb-20 ${
            certModalOpened ? "opacity-25" : ""
          }`}
        >
          <div
            className={`flex flex-col justify-center max-w-screen-md w-full p-4`}
          >
            {onboarding && (
              <div className="flex flex-col justify-center rounded-lg bg-light-dark dark:bg-dark-dark my-2 p-2">
                <div className="flex flex-row justify-center">
                  <div className="p-2">{t("myProfile.onboarding")}</div>
                </div>
              </div>
            )}
            <div className="flex flex-row justify-start">
              <Image
                alt={user?.name}
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
                  ? "flex flex-col justify-around rounded-lg bg-dark-dark pb-6 p-2"
                  : "flex flex-col justify-around rounded-lg bg-light-med pb-6 p-2"
              }`}
            >
              <div className="p-2 text-xl">{t("myProfile.agency")}</div>
              {!userAgency && (
                <div
                  className="border-l-4 p-4 mb-4 border-dark-red"
                  role="alert"
                >
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
                <div className="flex justify-center mt-8">
                  <Button
                    type={"primary"}
                    style={"contained"}
                    callback={() =>
                      userInserted && !userAgency && router.reload()
                    }
                  >
                    {t("myProfile.onboardingButton")}
                  </Button>
                </div>
              )}
            </div>
            {/* ### MG_NEW_USER */}
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
                  {skillsDatas && (
                    <Statistics
                      userAchievements={userAchievements}
                      skillsDatas={skillsDatas}
                      myStatistics={true}
                    />
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
          {certModalOpened && (
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
          )}
        </div>
      </CommonPage>
    );
  }
};

export default withAuthenticationRequired(Profile);
