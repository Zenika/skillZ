import React, { useContext } from "react";
import { appStateContext } from "../AppContext";
import "./Greetings.css";

const Greetings: React.FC = () => {
  const { appState, setAppState } = useContext(appStateContext);

  return (
    <div>
      <p>Greetings {appState.user.first_name}</p>
    </div>
  );
};

export default Greetings;
