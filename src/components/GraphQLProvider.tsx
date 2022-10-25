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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { config } from "../env";
import Loading from "./Loading";

const GraphQLProvider = ({ children }) => {
  const {
    getAccessTokenSilently,
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    error,
  } = useAuth0();

  const { push, pathname: pathName, asPath, locale, query } = useRouter();

  // console.log(asPath);

  const [client, setClient] = useState<ApolloClient<any> | undefined>(
    undefined
  );
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (error) {
      if (
        error.message === "Login required" ||
        error.message === "Consent required"
      ) {
        loginWithRedirect({
          prompt: "login",
          redirect_uri: config.nextPublicBaseUrl,
          //appState: { targetUrl: pathName, query, asPath },
        });
        return;
      } else {
        console.error(error);
        return;
      }
    }
    if (!isAuthenticated) {
      loginWithRedirect({
        redirect_uri: config.nextPublicBaseUrl,
        prompt: "none",
        appState: { targetUrl: pathName, query, asPath },
      });
      return;
    }
    (async () => {
      const [token, err] = await of(
        getAccessTokenSilently({ redirect_uri: config.nextPublicBaseUrl })
      );
      if (err) {
        console.error(err);
        return;
      }
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
  }, [
    isLoading,
    isAuthenticated,
    error,
    getAccessTokenSilently,
    loginWithRedirect,
  ]);

  if (client) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
  return <Loading />;
};

export default GraphQLProvider;
