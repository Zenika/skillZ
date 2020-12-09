import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import Login from "../Login/Login";

const Profile = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth0();
  if (!isAuthenticated) {
    return <Login />;
  }
  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
