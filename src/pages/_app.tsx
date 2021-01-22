import { ReactRelayContext } from "react-relay";
import { Auth0Provider } from "@auth0/auth0-react";
import { useEnvironment } from "../utils/relay";
import Head from "next/head";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";
import { usei18n } from "../utils/usei18n";
import { useRouter } from "next/router";
import { i18nContext } from "../utils/i18nContext";
import { useState } from "react";
import RelayEnvProvider from "../components/RelayEnvProvider";

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
  const [darkMode, setDarkMode] = useState(false);
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
            <title>ZProfile</title>
            <link rel="icon" href="/icon.svg" />
          </Head>
          <div className={`${darkMode ? "dark" : ""} + w-screen min-h-screen`}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Component {...pageProps} />
          </div>
        </RelayEnvProvider>
      </i18nContext.Provider>
    </Auth0Provider>
  );
};

export default App;
