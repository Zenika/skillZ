import React, { useContext, useEffect } from "react";
import { appStateContext } from "../AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { of } from "await-of";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../Home/Home";
import Greetings from "../Greetings/Greetings";
import Profile from "../Profile/Profile";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import { fetchAgencies, fetchUser } from "../api/fetchers";

const ContentManager: React.FC = () => {
  const { appState, setAppState } = useContext(appStateContext);
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();

  useEffect(() => {
    (async () => {
      if (!appState.token) {
        const [token, err] = await of(getAccessTokenSilently());
        if (err) {
          console.error(err);
          return;
        }
        setAppState({ ...appState, token });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!appState.token) {
        return;
      }
      const [agencies, err] = await of(fetchAgencies(appState.token || ""));
      if (err) {
        console.error(err);
        return;
      }
      setAppState({ ...appState, agencies: agencies || [] });
    })();
  }, [appState.token]);

  useEffect(() => {
    (async () => {
      if (!appState.token || !user || !user.email) {
        console.log("(!appState.token || !user || !user.email)");
        return;
      }
      const [storedUser, err] = await of(
        fetchUser(appState.token || "", user.email)
      );
      if (err) {
        console.error(err);
        return;
      }
      if (!storedUser || !storedUser[0] || storedUser[0].email === user.email) {
        console.log("could'nt find user", user.email);
        setAppState({ ...appState, initialized: true });
        return;
      }
      setAppState({
        ...appState,
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          agency: storedUser[0].agency,
        },
        initialized: true,
      });
    })();
  }, [appState.token, user]);

  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            {(() => {
              if (isLoading) {
                return <Loading />;
              }
              if (!isAuthenticated) {
                return <Login />;
              }
              if (!user) {
                return <Loading />;
              }
              return (
                <Switch>
                  {(() => {
                    if (!appState.user && appState.initialized) {
                      return <Redirect to="/greetings" />;
                    }
                  })()}
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
              );
            })()}
          </div>
        </div>
      </Router>
    </>
  );
};

export default ContentManager;
