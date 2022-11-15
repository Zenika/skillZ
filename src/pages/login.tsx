import { useMutation, useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import { GetUserQuery } from "../generated/graphql";
import { UPDATE_USER_ACTIVITY } from "../graphql/mutations/userInfos";
import { GET_USER_QUERY } from "../graphql/queries/userInfos";

const Login = () => {
  const { user } = useAuth0();
  const { push, query } = useRouter();

  /*
   * STATES
   */
  const [error, setError] = useState<boolean>(false);

  /*
   * QUERIES
   */
  const { data: userData, error: errorUserData } = useQuery<GetUserQuery>(
    GET_USER_QUERY,
    {
      variables: { email: user.email },
      fetchPolicy: "network-only",
    }
  );

  /*
   * MUTATIONS
   */
  const [updateLastLoginMutation] = useMutation(UPDATE_USER_ACTIVITY);

  useEffect(() => {
    if (!userData || !user) return;

    if (!userData.User.length) {
      // @ts-ignore
      push(query.returnTo);
      return;
    }

    updateLastLoginMutation({
      variables: {
        email: user.email,
        last_login: userData.User[0].current_login,
        current_login: new Date().toUTCString(),
      },
    })
      .then(() => {
        // @ts-ignore
        push(query.returnTo);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, [user, userData]);

  if (error || errorUserData) {
    return <ErrorPage />;
  }

  return <Loading></Loading>;
};

export default withAuthenticationRequired(Login);
