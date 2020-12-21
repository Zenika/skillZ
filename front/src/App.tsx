import React, { useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { appStateContext } from "./AppContext";
import { AppState, AppStateContext } from "./types";
import "./App.css";
import ContentManager from "./ContentManager/ContentManager";

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    initialized: false
  });
  const appStateContextValue: AppStateContext = { appState, setAppState };

  return (
    <appStateContext.Provider value={appStateContextValue}>
      <Auth0Provider
        domain="zenika.eu.auth0.com"
        clientId="DgnUjXulP4ijDqQLsFTDKw3e12wHN2Gt"
        redirectUri={window.location.origin}
        audience="https://zenika.eu.auth0.com/api/v2/"
        scope="read:current_user update:current_user_metadata"
      >
        <ContentManager />
      </Auth0Provider>
    </appStateContext.Provider>
  );
};

export default App;
