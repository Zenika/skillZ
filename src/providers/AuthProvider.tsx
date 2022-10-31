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
    push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={config.nextPublicAuth0Domain}
      clientId={config.nextPublicAuth0ClientId}
      redirectUri={`${config.nextPublicBaseUrl}${config.nextPublicAuth0Callback}`}
      scope="read:current_user"
      onRedirectCallback={onRedirectCallback}
      audience={config.nextPublicAuth0Audience}
      useRefreshTokens
      connection={config.nextPublicAuth0Connection}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
