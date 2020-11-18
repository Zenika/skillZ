import React from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { proxy, useProxy } from "valtio";
import { appStateContext } from "./AppContext";
import { AppState, AppStateContext } from "./types";
import "./App.css";
import Greetings from "./Greetings/Greetings";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const changeTranslation = (locale: string) => i18n.changeLanguage(locale);
  const appState: AppState = proxy({
    first_name: "Clément",
  });
  const appSnapshot: AppState = useProxy(appState);
  const appStateContextValue: AppStateContext = { appState, appSnapshot };

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
