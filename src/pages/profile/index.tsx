import { useContext, useState } from "react";
import { i18nContext } from "../../utils/i18nContext";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import CommonPage from "../../components/CommonPage";
import CustomSelect from "../../components/CustomSelect";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import BadgeSection from "./BadgeSection";
import ProgressBar from "./ProgressBar";

const USER_AGENCY_AND_AGENCIES_QUERY = gql`
  query getUserAgencyAndAllAgencies($email: String!) {
    User(where: { email: { _eq: $email } }) {
      email
      UserLatestAgency {
        agency
      }
    }
    Agency {
      name
    }
    Topic {
      id
      name
      UserTopics(where: { userEmail: { _eq: $email } }) {
        created_at
      }
    }
  }
`;

const INSERT_USER_MUTATION = gql`
  mutation insertUserMutation(
    $email: String!
    $name: String!
    $picture: String!
  ) {
    insert_User(
      objects: { email: $email, name: $name, picture: $picture }
      on_conflict: { constraint: User_pkey, update_columns: [name, picture] }
    ) {
      affected_rows
    }
  }
`;

const UPSERT_AGENCY_MUTATION = gql`
  mutation insertUserAgencyMutation($email: String!, $agency: String!) {
    insert_UserAgency_one(
      object: { userEmail: $email, agency: $agency }
      on_conflict: {
        constraint: UserAgency_pkey
        update_columns: [agency, created_at]
      }
    ) {
      agency
    }
  }
`;

const INSERT_USER_TOPIC_MUTATION = gql`
  mutation insertUserTopicMutation($email: String!, $topicId: uuid!) {
    insert_UserTopic_one(object: { userEmail: $email, topicId: $topicId }) {
      topicId
    }
  }
`;

const DELETE_USER_TOPIC_MUTATION = gql`
  mutation deleteUserTopicMutation($email: String!, $topicId: uuid!) {
    delete_UserTopic(
      where: { topicId: { _eq: $topicId }, userEmail: { _eq: $email } }
    ) {
      affected_rows
    }
  }
`;

type GetUserAgencyAndAllAgenciesResult = {
  User: { email: string; UserLatestAgency: { agency: string } }[];
  Agency: { name: string }[];
  Topic: { id: string; name: string; UserTopics: { created_at: string }[] }[];
};

const Profile = () => {
  const { user } = useAuth0();
  const { query } = useRouter();
  const { context } = query;
  const { t } = useContext(i18nContext);
  const { data, error, refetch } = useQuery<GetUserAgencyAndAllAgenciesResult>(
    USER_AGENCY_AND_AGENCIES_QUERY,
    {
      variables: { email: user?.email },
    }
  );
  const [insertUser] = useMutation(INSERT_USER_MUTATION);
  if (user) {
    insertUser({
      variables: {
        email: user?.email,
        name: user?.name,
        picture: user?.picture,
      },
    });
  }

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
  const [upsertAgency] = useMutation(UPSERT_AGENCY_MUTATION);
  const updateAgency = (agency: string) => {
    upsertAgency({ variables: { email: user?.email, agency } });
  };

  const [insertTopic] = useMutation(INSERT_USER_TOPIC_MUTATION);
  const [deleteTopic] = useMutation(DELETE_USER_TOPIC_MUTATION);
  const updateTopic = (selectedTopic: {
    id: string;
    name: string;
    UserTopics: { created_at: string }[];
  }) => {
    const topic = topics?.find(
      (value) =>
        selectedTopic.UserTopics.length > 0 && value.id === selectedTopic.id
    );
    if (!topic) {
      insertTopic({
        variables: { email: user?.email, topicId: selectedTopic.id },
      }).then(() =>
        refetch({
          variables: { email: user?.email },
        })
      );
    } else {
      deleteTopic({
        variables: { email: user?.email, topicId: selectedTopic.id },
      }).then(() =>
        refetch({
          variables: { email: user?.email },
        })
      );
    }
  };

  return (
    <CommonPage page={"profile"} faded={false} context={context}>
      <div className="flex flex-row justify-center mt-4 mb-20">
        <div className="flex flex-col justify-center max-w-screen-md w-full p-4">
          {onboarding ? (
            <div className="flex flex-col justify-center rounded-lg bg-light-dark dark:bg-dark-dark my-2 p-2">
              <div className="flex flex-row justify-center">
                <div className="p-2">{t("profile.onboarding")}</div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-row justify-start">
            <BadgeSection></BadgeSection>
            {/*<Image
              className="w-16 h-16 rounded-full"
              height="64"
              width="64"
              src={user?.picture || ""}
            />*/}
            <div className="flex flex-col mx-4 justify-center">
              <span>{user?.name}</span>
            </div>
          </div>
          <div className="flex">
            <ProgressBar></ProgressBar>
          </div>
          <div className="flex flex-col justify-around rounded-lg bg-dark-dark my-2 p-2">
            <div className="p-2">{t("profile.agency")}</div>
            <CustomSelect
              choices={agencies}
              selectedChoice={userAgency}
              placeholder={t("profile.selectPlaceholder")}
              onChange={(value: string) => updateAgency(value)}
            />
            {/* <div className="p-2">{t("profile.contact")}</div>
            <div className="flex flex-row justify-center p-2 w-full">
              <div className="flex flex-row justify-around">
                <button className={`rounded-full m-2 gradient-red-faded`}>
                  <span className="px-2 py-1 text-white">Email</span>
                </button>
                <button className={`rounded-full m-2 gradient-red-faded`}>
                  <span className="px-2 py-1 text-white">Slack</span>
                </button>
              </div>
            </div> */}
          </div>
          <div className="flex flex-col rounded-lg bg-light-dark dark:bg-dark-dark my-2 p-2">
            <span>{t("profile.topics")}</span>
            <div className="flex flex-row flex-wrap justify-around">
              {topics?.map((topic) => (
                <button
                  key={topic.name}
                  className={`rounded-full m-2 ${
                    topic.UserTopics.length <= 0
                      ? "gradient-red-faded"
                      : "gradient-red"
                  }`}
                  onClick={() => updateTopic(topic)}
                >
                  <span className="px-2 py-1 text-white">{topic.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center my-2 p-2">
            <div className="flex flex-row justify-center">
              <Link href={"/"}>
                <span className="p-2 px-4 gradient-red rounded-full text-white cursor-pointer">
                  {t("profile.confirm")}
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
