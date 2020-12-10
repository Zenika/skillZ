import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { of } from "await-of";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { appStateContext } from "./AppContext";
import { AppState, AppStateContext } from "./types";
import "./App.css";
import Home from "./Home/Home";
import { fetchAPI } from "./api/api";
import { QUERIES } from "./api/queries";
import Greetings from "./Greetings/Greetings";
import { API_URL } from "./config";
import Profile from "./Profile/Profile";
import Navbar from "./Navbar/Navbar";

const fetchAgencies = async () =>
  (
    await fetchAPI(
      fetch,
      API_URL,
      {
        query: QUERIES.getAgencies,
      },
      { "x-hasura-admin-secret": "key" }
    )
  ).data.Agency;

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    agencies: [],
  });
  const appStateContextValue: AppStateContext = { appState, setAppState };

  useEffect(() => {
    (async () => {
      const [result, err] = await of(fetchAgencies());
      if (err) {
        console.error(err); // TODO: handle errors with toast
        return;
      }
      setAppState({ ...appState, agencies: result || [] });
    })();
  }, []);

  return (
    <appStateContext.Provider value={appStateContextValue}>
      <Auth0Provider
        domain="zenika.eu.auth0.com"
        clientId="DgnUjXulP4ijDqQLsFTDKw3e12wHN2Gt"
        redirectUri={window.location.origin}
      >
        <Router>
          <div className="App">
            <Navbar />
            <div className="content">
              <Switch>
                <Route path="/greetings">
                  <Greetings />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </Auth0Provider>
    </appStateContext.Provider>
  );
};

export default App;
