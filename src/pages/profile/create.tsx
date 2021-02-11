import React, { useContext } from "react";
import { i18nContext } from "../../utils/i18nContext";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import { gql, useQuery } from "@apollo/client";

type Agency = [{ name: string }];
type UserData = [{ email: string }];
type CreateProfileData = {
  User: UserData;
  Agency: Agency;
};

const CREATE_PROFILE_QUERY = gql`
  query createProfileQuery($email: String!) {
    User(where: { email: { _eq: $email } }) {
      email
    }
    Agency {
      name
    }
  }
`;

const CreateProfile = () => {
  const { push } = useRouter();
  const { t } = useContext(i18nContext);
  const { user, isLoading } = useAuth0();
  const { data, error, loading } = useQuery<CreateProfileData>(
    CREATE_PROFILE_QUERY,
    {
      variables: { email: user.email },
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
    const agencies = data.Agency.map((agency) => agency.name);
    return (
      <div className="flex flex-auto justify-around text-center flex-col">
        <h1>Let's create a profile !</h1>
        <h2>First, which agency are you working at ?</h2>
        <div className="flex flex-auto flex-col justify-around text-center">
          {agencies?.map((agency) => (
            <button className="dark:bg-dark-panel flex-grow-0 rounded-full py-3 px-6 mx-6" key={agency}>{agency}</button>
          ))}
        </div>
      </div>
    );
  }
  return <Loading />;
};

export default withAuthenticationRequired(CreateProfile);
