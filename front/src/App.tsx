import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { of } from "await-of";
import { appStateContext } from "./AppContext";
import { AppState, AppStateContext } from "./types";
import "./App.css";
import Greetings from "./Greetings/Greetings";
import { fetchAPI } from "./api/api";
import { QUERIES } from "./api/queries";
import Login from "./Login/Login";
import { API_URL } from "./config";

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
  const { t, i18n } = useTranslation();
  const changeTranslation = (locale: string) => i18n.changeLanguage(locale);
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
      <Router>
        <div className="App">
          <header className="App-header">
            <div>
              <Link to="/" className="App-header-item">
                {t("nav.home")}
              </Link>
              <Link to="/profile" className="App-header-item">
                {t("nav.profile")}
              </Link>
            </div>
            <div>
              <a
                className="App-header-item-translation cy-translation-en"
                onClick={() => changeTranslation("en")}
              >
                EN
              </a>
              <a
                className="App-header-item-translation cy-translation-fr"
                onClick={() => changeTranslation("fr")}
              >
                FR
              </a>
            </div>
          </header>
          <div className="content">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/profile">
                <p>profile</p>
              </Route>
              <Route path="/">
                <p>home</p>
                <Greetings />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </appStateContext.Provider>
  );
};

export default App;
