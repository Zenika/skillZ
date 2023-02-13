import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import React from "react";
import { config } from "../env";

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
  const { push } = useRouter();

  /**
   * Callback triggered when a successful login occurs.
   */
  const onRedirectCallback: Auth0ProviderOptions["onRedirectCallback"] = (
    appState
  ) => {
    push({
      pathname: `/login`,
      search: `returnTo=${appState?.returnTo || window.location.pathname}`,
    });
  };

  return (
    <Auth0Provider
      domain={config.nextPublicAuth0Domain}
      clientId={config.nextPublicAuth0ClientId}
      authorizationParams={{
        redirect_uri: `${config.nextPublicBaseUrl}${config.nextPublicAuth0Callback}`,
        audience: config.nextPublicAuth0Audience,
        scope: "read:current_user openid profile email",
        connection: config.nextPublicAuth0Connection,
        prompt: "login",
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
