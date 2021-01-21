import React, { Dispatch, SetStateAction, useContext } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { i18nContext } from "../utils/i18nContext";

const Navbar = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const { isLoading, user } = useUser();
  const { t, changeLocale } = useContext(i18nContext);

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
          {!isLoading &&
            (user ? (
              <Link href="/api/auth/logout">
                <button>{t("nav.logout")}</button>
              </Link>
            ) : (
              <Link href="/api/auth/login">
                <button>{t("nav.login")}</button>
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
