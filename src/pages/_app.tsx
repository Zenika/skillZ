import { Auth0Provider } from "@auth0/auth0-react";
import Head from "next/head";
import { usei18n } from "../utils/usei18n";
import { useRouter } from "next/router";
import { i18nContext } from "../utils/i18nContext";
import React, { useState } from "react";
import GraphQLProvider from "../components/GraphQLProvider";
import "../styles/globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_BASE_URL isn't defined"
  );
}

const App = ({ Component, pageProps }) => {
  const { push, pathname: pathName, asPath, locale } = useRouter();
  const changeLocale = (locale: string) => {
    push(pathName, asPath, { locale });
  };
  const t = usei18n(locale);
  const [darkMode, setDarkMode] = useState(true);
  return (
    <Auth0Provider
      domain="zenika.eu.auth0.com"
      clientId="DgnUjXulP4ijDqQLsFTDKw3e12wHN2Gt"
      audience="https://zenika.eu.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
      redirectUri={BASE_URL}
    >
      <i18nContext.Provider value={{ t, changeLocale }}>
        <GraphQLProvider>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
          </Head>
          <div className={`${darkMode ? "dark" : ""}`}>
            <div className="w-screen min-h-screen overflow-x-hidden flex flex-auto flex-col text-base dark:bg-dark-med dark:text-dark-graytext">
              <Component {...{ pathName, ...pageProps }} />
            </div>
          </div>
        </GraphQLProvider>
      </i18nContext.Provider>
    </Auth0Provider>
  );
};

export default App;
