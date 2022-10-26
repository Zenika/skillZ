import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactElement, ReactNode } from "react";
import { config } from "../env";

const GraphQLProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const { getAccessTokenSilently } = useAuth0();

  const client = React.useMemo(() => {
    const httpLink = createHttpLink({
      uri: config.nextPublicGraphqlUrl,
    });

    const cache = new InMemoryCache();

    const authLink = setContext(async (_, { headers }) => {
      const token = await getAccessTokenSilently();

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient<any>({
      link: from([authLink, httpLink]),
      cache,
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;
