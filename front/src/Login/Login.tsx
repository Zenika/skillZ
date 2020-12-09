import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return (
      <div>
        <h1>{t("login.title")}</h1>
        <p>{t("login.description")}</p>
        <button onClick={() => loginWithRedirect()}>{t("login.button")}</button>
      </div>
    );
  }
  return (
    <div>
      <p>{t("login.alreadyLoggedIn")}</p>
    </div>
  );
};

export default Login;
