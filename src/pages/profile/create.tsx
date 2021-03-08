import React, { useContext, useState } from "react";
import { i18nContext } from "../../utils/i18nContext";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import { gql, useMutation, useQuery } from "@apollo/client";
import AgencySelector from "../../components/AgencySelector";
import TopicSelector from "../../components/TopicSelector";
import Topbar from "../../components/Topbar";
import Link from "next/link";

type UserData = [{ email: string }];
type WasUserOnboardedData = {
  User: UserData;
};

const WAS_USER_ONBOARDED_QUERY = gql`
  query wasUserOnboardedQuery($email: String!) {
    User(where: { email: { _eq: $email } }) {
      email
    }
  }
`;

const INSERT_USER_MUTATION = gql`
  mutation insertUserMutation(
    $email: String!
    $agency: String!
    $topics: UserTopic_arr_rel_insert_input
  ) {
    insert_User(
      objects: {
        email: $email
        UserAgencies: { data: { agency: $agency } }
        UserTopics: $topics
      }
    ) {
      affected_rows
    }
  }
`;

const CreateProfile = () => {
  const [agency, setAgency] = useState<string | undefined>(undefined);
  const { push } = useRouter();
  const { t } = useContext(i18nContext);
  const [topics, setTopics] = useState([]);
  const { user, isLoading } = useAuth0();
  const { data, error, loading } = useQuery<WasUserOnboardedData>(
    WAS_USER_ONBOARDED_QUERY,
    {
      variables: {
        email: user.email,
      },
    }
  );
  const [
    insertUser,
    { data: mutationData, error: mutationError },
  ] = useMutation(INSERT_USER_MUTATION);

  const createProfile = () => {
    if (!agency || topics.length <= 0) {
      return;
    }
    insertUser({
      variables: {
        email: user.email,
        agency,
        topics: {
          data: topics.map((topic) =>
            topic ? { topicId: topic.Topic.id } : undefined
          ),
        },
      },
    });
  };

  const wasUserOnboarded = data?.User.length > 0;
  if (wasUserOnboarded) {
    console.log("user already has a profile, redirecting ...");
    push("/profile");
  }

  if (error || mutationError) {
    console.error(error || mutationError);
    return (
      <div>
        Something bad happened: {error?.message || mutationError?.message}
      </div>
    );
  }
  if (mutationData) {
    return (
      <div className="flex flex-auto justify-around text-center flex-col">
        <p>
          {`${t("createProfile.profileCreated")} `}
          {mutationData?.data?.insert_User?.affected_rows}
        </p>
        <Link href="/">
          <div className="rounded-full py-3 px-6 mx-6 my-2 gradient-red">
            {t("createProfile.homepage")}
          </div>
        </Link>
      </div>
    );
  }
  if (data && !isLoading && !loading) {
    return (
      <div className="flex flex-auto justify-around text-center flex-col">
        <Topbar />
        <h1>{t("createProfile.title")}</h1>
        <h2>
          {!agency ? t("createProfile.agency") : t("createProfile.topics")}
        </h2>
        <div className="flex flex-auto flex-col justify-around text-center py-2">
          {!agency ? (
            <AgencySelector setAgency={setAgency} />
          ) : (
            <div className="flex flex-auto flex-col">
              <button
                className={`${
                  topics.length <= 0 ? "dark:bg-dark-panel" : "gradient-yellow"
                } flex-grow-0 rounded-full py-3 px-6 mx-6`}
                onClick={() => createProfile()}
              >
                {t("createProfile.submit")}
              </button>
              <TopicSelector
                email={user.email}
                topics={topics}
                setTopics={setTopics}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
  return <Loading />;
};

export default withAuthenticationRequired(CreateProfile);
