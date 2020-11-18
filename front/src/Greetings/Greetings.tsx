import React, { useContext } from "react";
import { appStateContext } from "../AppContext";
import "./Greetings.css";

const Greetings: React.FC = () => {
  const { appState, appSnapshot } = useContext(appStateContext);

  return (
    <div>
      <p>Greetings {appSnapshot.first_name}</p>
    </div>
  );
};

export default Greetings;
