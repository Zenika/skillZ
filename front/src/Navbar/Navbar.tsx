import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "../Logout/Logout";

const Navbar: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { t, i18n } = useTranslation();
  const changeTranslation = (locale: string) => i18n.changeLanguage(locale);
  return (
    <header className="App-header">
      <div>
        <NavLink  to="/" className="App-header-item">
          {t("nav.home")}
        </NavLink>
        <NavLink to="/profile" className="App-header-item">
          {t("nav.profile")}
        </NavLink>
      </div>
      <div className="App-header-item">ZProfile</div>
      <div>
        <a
          className="App-header-item-translation cy-translation-en"
          onClick={() => changeTranslation("en")}
        >
          EN
        </a>
        <a
          className="App-header-item-translation cy-translation-fr"
          onClick={() => changeTranslation("fr")}
        >
          FR
        </a>
        <Logout />
      </div>
    </header>
  );
};

export default Navbar;
