import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { of } from "await-of";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
if (!GRAPHQL_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_GRAPHQL_URL isn't defined"
  );
}

const GraphQLProvider = ({ children }) => {
  const {
    getAccessTokenSilently,
    loginWithRedirect,
    isAuthenticated,
  } = useAuth0();
  const [client, setClient] = useState<ApolloClient<any> | undefined>(
    undefined
  );
  useEffect(() => {
    (async () => {
      const [token, err] = await of(getAccessTokenSilently());
      if (err) {
        console.error(err);
        loginWithRedirect();
      }
      const httpLink = createHttpLink({
        uri: GRAPHQL_URL,
      });

      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      });

      setClient(
        new ApolloClient<any>({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
        })
      );
    })();
  }, []);
  if (client) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
  return <Loading />;
};

export default GraphQLProvider;
