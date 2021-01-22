import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ReactRelayContext } from "react-relay";
import { FetchFunction, GraphQLResponse } from "relay-runtime";
import { useEnvironment } from "../utils/relay";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
if (!GRAPHQL_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_GRAPHQL_URL isn't defined"
  );
}

const RelayEnvProvider = ({ children, pageProps }) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (isLoading || !isAuthenticated) {
        return;
      }
      const result = await getAccessTokenSilently();
      setToken(result);
    })();
  });
  const fetchQuery: FetchFunction = (
    operation,
    variables,
    cacheConfig,
    uploadables
  ) => {
    return token
      ? fetch(GRAPHQL_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: operation.text,
            variables,
          }),
        }).then((response) => response.json())
      : Promise.resolve({ errors: [], data: {} });
  };
  const environment = useEnvironment(fetchQuery, pageProps.initialRecords);
  return (
    <ReactRelayContext.Provider value={{ environment }}>
      {children}
    </ReactRelayContext.Provider>
  );
};

export default RelayEnvProvider;
