import React, { useContext } from "react";
import Link from "next/link";
import { graphql } from "react-relay";
import { useQuery } from "relay-hooks";
import Loading from "../components/Loading";
import { i18nContext } from "../utils/i18nContext";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const rootQuery = graphql`
  query profileQuery($email: String!) {
    UserAgency_connection(where: { userEmail: { _eq: $email } }) {
      edges {
        node {
          agency
        }
      }
    }
  }
`;

const Profile = () => {
  const { user, isLoading } = useAuth0();
  const { data, error, isLoading: isDataLoading } = useQuery<any>(rootQuery, {
    email: user.email,
  });
  const { t } = useContext(i18nContext);
  if (error) {
    console.error(error);
    return <div>Something bad happened: {error.message}</div>;
  }
  if (data && !isLoading && !isDataLoading) {
    const agency = data.UserAgency_connection?.edges[0]?.node?.agency;
    if (!agency) {
      return (
        <div className="flex flex-1 flex-col justify-center p-12">
          <p>
            {t("profile.createAProfileFirst")}{" "}
            <Link href="/greetings">
              <button className="border ">{t("profile.here")}</button>
            </Link>
          </p>
        </div>
      );
    }
    return (
      <div className="flex flex-1 flex-col justify-center p-12">
        <img className="w-32 h-32" src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{t(`agencies.${agency}`)}</p>
      </div>
    );
  }
  return <Loading />;
};

export default withAuthenticationRequired(Profile);
