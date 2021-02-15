import React, { useContext, useState } from "react";
import { i18nContext } from "../../utils/i18nContext";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import { gql, useQuery } from "@apollo/client";
import AgencySelector from "../../components/AgencySelector";
import TopicSelector from "../../components/TopicSelector";
import Topbar from "../../components/Topbar";

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

  const wasUserOnboarded = data?.User.length > 0;
  if (wasUserOnboarded) {
    console.log("user already has a profile, redirecting ...");
    push("/profile");
  }

  if (error) {
    console.error(error);
    return <div>Something bad happened: {error.message}</div>;
  }
  if (data && !isLoading && !loading) {
    return (
      <div className="flex flex-auto justify-around text-center flex-col">
        <Topbar />
        <h1>Let's create a profile !</h1>
        <h2>
          {!agency
            ? "First, which agency are you working at ?"
            : "What topic are you interested in ? Don't worry you can change it later"}
        </h2>
        <div className="flex flex-auto flex-col justify-around text-center">
          {!agency ? (
            <AgencySelector setAgency={setAgency} />
          ) : (
            <div className="flex flex-auto flex-col">
              <button
                className={`${
                  topics.length <= 0 ? "dark:bg-dark-panel" : "gradient-yellow"
                } flex-grow-0 rounded-full py-3 px-6 mx-6`}
              >
                Submit
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
