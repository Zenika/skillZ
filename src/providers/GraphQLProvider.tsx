import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { of } from "await-of";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";
import { config } from "../env";

const GraphQLProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const { getAccessTokenSilently, isLoading, error } = useAuth0();
  const [client, setClient] = useState<ApolloClient<any> | undefined>(
    undefined
  );

  useEffect(() => {
    if (isLoading || error) {
      return;
    }
    (async () => {
      const [token, err] = await of(getAccessTokenSilently());

      const httpLink = createHttpLink({
        uri: config.nextPublicGraphqlUrl,
      });

      const cache = new InMemoryCache();

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
          link: from([authLink, httpLink]),
          cache,
        })
      );
    })();
  }, [isLoading, error, getAccessTokenSilently]);

  if (client) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  } else {
    return <Loading />;
  }
};

export default GraphQLProvider;
