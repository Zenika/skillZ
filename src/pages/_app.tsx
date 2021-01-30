import { Auth0Provider } from "@auth0/auth0-react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import "tailwindcss/tailwind.css";
import { usei18n } from "../utils/usei18n";
import { useRouter } from "next/router";
import { i18nContext } from "../utils/i18nContext";
import React, { useState } from "react";
import RelayEnvProvider from "../components/RelayEnvProvider";
import "../styles/globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error(
    "ERROR: app couldn't start because NEXT_PUBLIC_BASE_URL env variable is not defined"
  );
}

const App = ({ Component, pageProps }) => {
  const { push, pathname, asPath, locale } = useRouter();
  const changeLocale = (locale: string) => {
    push(pathname, asPath, { locale });
  };
  const t = usei18n(locale);
  const [darkMode, setDarkMode] = useState(true);
  return (
    <Auth0Provider
      domain="zenika.eu.auth0.com"
      clientId="DgnUjXulP4ijDqQLsFTDKw3e12wHN2Gt"
      redirectUri={BASE_URL}
      audience="https://zenika.eu.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <i18nContext.Provider value={{ t, changeLocale }}>
        <RelayEnvProvider pageProps={pageProps}>
          <Head>
            <title>skillZ</title>
            <link rel="icon" href="/icon.svg" />
            <link
              rel="preload"
              href="/fonts/Nunito/Nunito-Regular.ttf"
              as="font"
              crossOrigin=""
            />
          </Head>
          <div className={`${darkMode ? "dark" : ""}`}>
            <div className="w-screen min-h-screen overflow-x-hidden flex flex-auto flex-col dark:bg-dark-med">
              <div className="flex-grow-0">
                <Topbar />
              </div>
              <div className="dark:text-dark-graytext">
                <Component {...pageProps} />
              </div>
              <div>
                <Navbar
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  path={pathname}
                />
              </div>
            </div>
          </div>
        </RelayEnvProvider>
      </i18nContext.Provider>
    </Auth0Provider>
  );
};

export default App;
