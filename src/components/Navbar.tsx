import React, { Dispatch, SetStateAction, useContext } from "react";
import Link from "next/link";
import { i18nContext } from "../utils/i18nContext";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const { t, changeLocale } = useContext(i18nContext);

  if (error) {
    console.error(
      `Something bad happened while authenticating user: ${error.message}`
    );
    return;
  }

  return (
    <header className="flex flex-auto flex-row justify-center bg-red-800 dark:bg-gray-800 text-white">
      <div className="flex flex-auto flex-row justify-start p-2">
        <Link href="/">
          <div className="p-2">{t("nav.home")}</div>
        </Link>
        {!isLoading &&
          (user ? (
            <Link href="/profile">
              <div className="p-2">{t("nav.profile")}</div>
            </Link>
          ) : (
            <></>
          ))}
      </div>
      <div className="flex flex-auto justify-center">
        <h1 className="p-4">ZProfile</h1>
      </div>
      <div className="flex flex-auto flex-row justify-end p-2">
        <div className="flex flex-auto flex-row justify-end">
          <a className="p-2" onClick={() => changeLocale("en")}>
            EN
          </a>
          <a className="p-2" onClick={() => changeLocale("fr")}>
            FR
          </a>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? t("nav.darkmode") : t("nav.classic")}
          </button>
        </div>
        <div className="flex flex-auto flex-row justify-end p-2">
          {!isLoading && isAuthenticated ? (
            <button onClick={() => logout()}>{t("nav.logout")}</button>
          ) : (
            <button onClick={() => loginWithRedirect()}>
              {t("nav.login")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
