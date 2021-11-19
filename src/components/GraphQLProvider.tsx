import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { of } from "await-of";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
if (!GRAPHQL_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_GRAPHQL_URL isn't defined"
  );
}

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!NEXT_PUBLIC_BASE_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_BASE_URL isn't defined"
  );
}

const GraphQLProvider = ({ children }) => {
  const {
    getAccessTokenSilently,
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    error,
  } = useAuth0();
  const [client, setClient] = useState<ApolloClient<any> | undefined>(
    undefined
  );
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (error) {
      if (error.message === "Login required") {
        loginWithRedirect({
          redirect_uri: NEXT_PUBLIC_BASE_URL,
          prompt: "login",
        });
        return;
      } else {
        console.error(error);
        return;
      }
    }
    if (!isAuthenticated) {
      loginWithRedirect({ redirect_uri: NEXT_PUBLIC_BASE_URL, prompt: "none" });
      return;
    }
    (async () => {
      const [token, err] = await of(
        getAccessTokenSilently({ redirect_uri: NEXT_PUBLIC_BASE_URL })
      );
      if (err) {
        console.error(err);
        return;
      }
      const httpLink = createHttpLink({
        uri: GRAPHQL_URL,
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
          link: authLink.concat(httpLink),
          cache,
        })
      );
    })();
  }, [isLoading, isAuthenticated]);
  if (client) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
  return <Loading />;
};

export default GraphQLProvider;
