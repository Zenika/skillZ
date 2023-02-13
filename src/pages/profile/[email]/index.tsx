import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import React from "react";
import Profile from "../../../components/organisms/Profile";

const ViewProfilePage = () => {
  const { query } = useRouter();
  const { email: userEmail } = query;

  return <Profile userEmail={userEmail as string} readOnly={true} />;
};

export default withAuthenticationRequired(ViewProfilePage);
