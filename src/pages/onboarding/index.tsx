import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import Topbar from "../../components/Topbar";

const Onboarding = () => {
  return (
    <>
      <Topbar />
      <div className="flex flex-auto flex-col">

      </div>
    </>
  );
};

export default withAuthenticationRequired(Onboarding);
