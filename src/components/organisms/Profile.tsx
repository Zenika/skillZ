import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { GoGraph } from "react-icons/go";
import { config } from "../../env";
import { GetUserAgencyAndAllAgenciesQuery } from "../../generated/graphql";
import {
  DELETE_USER_CERTIFICATION_MUTATION,
  DELETE_USER_TOPIC_MUTATION,
  INSERT_USER_MUTATION,
  INSERT_USER_TOPIC_MUTATION,
  UPSERT_USER_AGENCY_MUTATION,
  UPSERT_USER_CERTIFICATION_MUTATION,
} from "../../graphql/mutations/userInfos";
import { GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY } from "../../graphql/queries/userInfos";
import Custom404 from "../../pages/404";
import { displayNotification } from "../../utils/displayNotification";
import { i18nContext } from "../../utils/i18nContext";
import { TopicItem, UserCertification } from "../../utils/types";
import Button from "../atoms/Button";
import CustomSelect from "../atoms/CustomSelect/CustomSelect";
import CertificationsList from "../molecules/CertificationsList";
import Loading from "../molecules/Loading";
import Modal from "../molecules/Modal";
import { Statistics } from "../molecules/Statistics";
import Topics from "../molecules/Topics";
import CommonPage from "../templates/CommonPage";
import ErrorPage from "../templates/ErrorPage";
import CertificationModal from "./CertificationModal";

type ProfileProps = {
  userEmail: string;
  userName?: string;
  userPicture?: string;
  readOnly?: boolean;
};

const Profile = ({
  userEmail,
  readOnly = true,
  userName,
  userPicture,
}: ProfileProps) => {
  const { t } = useContext(i18nContext);

  // CONTEXT
  const { push, reload } = useRouter();

  // STATES
  const [certModalOpened, setCertModalOpened] = useState(false);
  const [selectedUserCert, setSelectedUserCert] =
    useState<UserCertification | null>(null);

  // QUERIES
  const { data, error, refetch, loading } =
    useQuery<GetUserAgencyAndAllAgenciesQuery>(
      GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY,
      {
        variables: { email: userEmail },
        fetchPolicy: "network-only",
      }
    );

  // MUTATIONS
  const [insertUser] = useMutation(INSERT_USER_MUTATION);
  const [upsertAgency] = useMutation(UPSERT_USER_AGENCY_MUTATION);
  const [insertTopic] = useMutation(INSERT_USER_TOPIC_MUTATION);
  const [deleteTopic] = useMutation(DELETE_USER_TOPIC_MUTATION);
  const [upsertCertificationMutation] = useMutation(
    UPSERT_USER_CERTIFICATION_MUTATION
  );
  const [deleteCertificationMutation] = useMutation(
    DELETE_USER_CERTIFICATION_MUTATION
  );

  // CALLBACKS
  const updateAgency = (agency: string) => {
    insertUser({
      variables: {
        email: userEmail,
        name: userName,
        picture: userPicture,
      },
    }).then(() => {
      upsertAgency({ variables: { email: userEmail, agency } }).then(() => {
        reload();
      });
    });
  };

  const addTopic = (topic: TopicItem) => {
    insertTopic({
      variables: { email: userEmail, topicId: topic.id },
    }).then(() =>
      refetch({
        variables: { email: userEmail },
      })
    );
  };

  const removeTopic = (topic: TopicItem) => {
    deleteTopic({
      variables: { email: userEmail, topicId: topic.id },
    }).then(() =>
      refetch({
        variables: { email: userEmail },
      })
    );
  };

  const updateCertification = (userCert: UserCertification) => {
    upsertCertificationMutation({
      variables: {
        email: userEmail,
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
        setCertModalOpened(false);
        setSelectedUserCert(null);
        refetch();
      })
      .catch(() => {
        displayNotification(
          `${t("myProfile.updateUserCertError")}`,
          "red",
          5000
        );
      });
  };

  const deleteCertification = (userCert: UserCertification) => {
    deleteCertificationMutation({
      variables: {
        email: userEmail,
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
        setCertModalOpened(false);
        setSelectedUserCert(null);
        refetch();
      })
      .catch(() => {
        displayNotification(
          `${t("myProfile.deleteUserCertError")}`,
          "red",
          5000
        );
      });
  };

  const linkRadar = new URL(
    `${config.nextPublicBaseUrl}/profile/${userEmail}/graphs`
  );

  const onboarding =
    !data ||
    data?.Agency.length <= 0 ||
    !data?.User[0]?.UserLatestAgency?.agency;

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorPage />;
  } else if (!data?.User?.length && readOnly) {
    return <Custom404 />;
  } else {
    return (
      <CommonPage page={"Profile"}>
        <div className={`flex flex-row justify-center mt-4 mb-20`}>
          <div className={`flex flex-col max-w-screen-md w-full p-4`}>
            {/* ONBOARDING */}
            {onboarding && !readOnly && (
              <div className="flex flex-col justify-center rounded-lg bg-light-dark dark:bg-dark-dark mt-4 mb-10 p-2">
                <div className="flex flex-row justify-center">
                  <div className="p-2">{t("myProfile.onboarding")}</div>
                </div>
              </div>
            )}
            {/* ONBOARDING */}

            {/* PRESENTATION */}
            <div className="flex flex-row place-content-between mb-2">
              <div className="flex flex-row justify-start">
                <Image
                  alt={userName ?? data?.User[0].name ?? ""}
                  className="w-16 h-16 rounded-full"
                  height="64"
                  width="64"
                  src={userPicture ?? data?.User[0].picture ?? ""}
                />
                <div className="flex flex-col mx-4 justify-center">
                  <span>{userName ?? data?.User[0].name ?? ""}</span>
                </div>
              </div>
              {readOnly && (
                <Button
                  type={"primary"}
                  callback={() => push(linkRadar)}
                  icon={<GoGraph />}
                >
                  {t("userProfile.seeRadars")}
                </Button>
              )}
            </div>
            {/* PRESENTATION*/}

            {/* AGENCY */}
            <div className="flex flex-col justify-around rounded-lg dark:bg-dark-dark bg-light-dark py-4 px-4 my-2">
              <div className="pb-2 text-xl">
                {readOnly ? t("userProfile.agency") : t("myProfile.agency")}
              </div>
              {onboarding && !readOnly && (
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
                readOnly={readOnly}
                labelFn={(x) => x}
                keyFn={(x) => x}
                choices={data.Agency.map((agency) => agency.name) ?? []}
                selectedChoice={data.User[0]?.UserLatestAgency?.agency}
                placeholder={t("myProfile.selectPlaceholder")}
                onChange={(value: string) => updateAgency(value)}
              />
            </div>
            {/* AGENCY */}

            {((onboarding && readOnly) || !onboarding) && (
              <>
                {/* TOPICS */}
                <Topics
                  topics={data.Topic.map((topic) => {
                    return { id: topic.id, name: topic.name };
                  })}
                  selectedTopics={data.UserTopic.map((t) => t.topicId)}
                  title={t("userProfile.topics")}
                  addCallback={(topic) => {
                    addTopic(topic);
                  }}
                  removeCallback={(topic) => {
                    removeTopic(topic);
                  }}
                  readOnly={readOnly}
                />
                {/* TOPICS */}

                {/* CERTIFICATIONS */}
                <CertificationsList
                  userCertifications={data?.UserCertification ?? []}
                  onUserCertificationSelect={(userCert) => {
                    setCertModalOpened(true);
                    setSelectedUserCert(userCert);
                  }}
                  onUserCertificationAdd={() => setCertModalOpened(true)}
                  readOnly={readOnly}
                />
                {/* CERTIFICATIONS */}

                {/* STATISTICS */}
                <Statistics
                  userAchievements={data?.UserAchievements ?? []}
                  skillsDatas={data?.Category}
                  readOnly={readOnly}
                />
                {/* STATISTICS */}
              </>
            )}
          </div>
        </div>

        {certModalOpened && (
          <Modal
            closeModal={() => {
              setCertModalOpened(false);
              setSelectedUserCert(null);
            }}
          >
            <CertificationModal
              userCertificationRef={selectedUserCert}
              certificationsRef={data?.Certification ?? []}
              onCancel={() => {
                setCertModalOpened(false);
                setSelectedUserCert(null);
              }}
              onConfirm={(userCertification) =>
                updateCertification(userCertification)
              }
              onDelete={(userCertification) =>
                deleteCertification(userCertification)
              }
            />
          </Modal>
        )}
      </CommonPage>
    );
  }
};

export default Profile;
