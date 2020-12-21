import React, { useContext, useEffect } from "react";
import { appStateContext } from "../AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { of } from "await-of";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "../Home/Home";
import Greetings from "../Greetings/Greetings";
import Profile from "../Profile/Profile";
import Navbar from "../Components/Navbar/Navbar";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import { fetchUser } from "../api/fetchers";
import "./ContentManager.css";

const ContentManager: React.FC = () => {
  const { appState, setAppState } = useContext(appStateContext);
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    user
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
      if (!appState.token || !user || !user.email) {
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
        setAppState({ ...appState, initialized: true });
        return;
      }
      setAppState({
        ...appState,
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          agency: storedUser[0].agency
        },
        initialized: true
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
              if (!user || !appState.initialized) {
                return <Loading />;
              }
              return (
                <Switch>
                  <Route path="/greetings">
                    <Greetings />
                  </Route>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/profile">
                    {(() => {
                      if (!appState.user && appState.initialized) {
                        return <Redirect to="/greetings" />;
                      }
                      return <Profile />;
                    })()}
                  </Route>
                  <Route>
                    <>404 error - No match found</>
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
