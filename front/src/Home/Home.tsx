import React, { useContext } from "react";
import "./Home";
import { appStateContext } from "../AppContext";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { appState, setAppState } = useContext(appStateContext);
  const { t, i18n } = useTranslation();

  return (
    <div>
      
    </div>
  );
};

export default Home;
