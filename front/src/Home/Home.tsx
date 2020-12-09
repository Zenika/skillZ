import React, { useContext } from "react";
import "./Home";
import { appStateContext } from "../AppContext";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login/Login";

const Home: React.FC = () => {
  const { appState, setAppState } = useContext(appStateContext);
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return <Login />
  }
  
  return (
    <div></div>
  );
};

export default Home;
