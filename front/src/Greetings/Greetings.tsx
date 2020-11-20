import React, { useContext } from "react";
import { appStateContext } from "../AppContext";
import "./Greetings.css";

const Greetings: React.FC = () => {
  const { appState, setAppState } = useContext(appStateContext);
  const userFirstName = appState.user?.firstName;
  return (
    <div>
      <p>Greetings {userFirstName}</p>
    </div>
  );
};

export default Greetings;
