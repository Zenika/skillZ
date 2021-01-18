import React from "react";
import { graphql } from "react-relay";
import { useQuery } from "relay-hooks";
import { usei18n } from "../utils/usei18n";
import { useRouter } from "next/router";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

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

const Profile = (props) => {
  const { locale } = useRouter();
  const t = usei18n(locale);
  const { user, isLoading } = useUser();
  const { data, error, retry, isLoading: isDataLoading } = useQuery<any>(
    rootQuery,
    {
      email: user.email,
    }
  );
  if (isLoading || isDataLoading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Something bad happened: {error.message}</div>;
  }
  if (data) {
    const agency = data.UserAgency_connection?.edges[0]?.node?.agency;
    return (
      <div className="flex flex-1 flex-col justify-center p-12">
        <img className="w-32 h-32" src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{t(`agencies.${agency}`)}</p>
      </div>
    );
  }
  return <div>Loading</div>;
};

export default withPageAuthRequired(Profile);
