import React, { useContext, useEffect } from "react";
import "./Home";
import { appStateContext } from "../AppContext";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { appState, setAppState } = useContext(appStateContext);
  const { t } = useTranslation();

  return <>home</>;
};

export default Home;
