import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { of } from "await-of";
import { appStateContext } from "./AppContext";
import { AppState, AppStateContext } from "./types";
import "./App.css";
import Greetings from "./Greetings/Greetings";
import { fetchAPI } from "./api";

const API_URL = "http://localhost:8080/v1/graphql";

const fetchAgencies = async () => {
  const [res, err] = await of(
    fetchAPI(
      fetch,
      API_URL,
      {
        query: `query MyQuery {
    Agency {
      id
      name
    }
  }`,
      },
      { "x-hasura-admin-secret": "key" }
    )
  );
  if (err) {
    console.error("An error occured", err);
    return;
  }
  return res;
};

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const changeTranslation = (locale: string) => i18n.changeLanguage(locale);
  const [appState, setAppState] = useState<AppState>({
    user: {
      first_name: "Clément",
    },
    agencies: [],
  });
  const appStateContextValue: AppStateContext = { appState, setAppState };

  useEffect(() => {
    fetchAgencies()
      .then((result) =>
        setAppState({ ...appState, agencies: result?.data?.Agency })
      )
      .catch((err) => console.error(err));
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
              <Route path="/profile">
                <p>profile</p>
              </Route>
              <Route path="/">
                <p>home</p>
                agencies:
                <ul>
                  {appState.agencies.map((agency) => (
                    <li key={agency.id}>{agency.name}</li>
                  ))}
                </ul>
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
