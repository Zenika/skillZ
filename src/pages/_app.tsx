import { Auth0Provider } from "@auth0/auth0-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GraphQLProvider from "../components/GraphQLProvider";
import { config } from "../env";
import "../styles/404.css";
import "../styles/globals.css";
import { DarkModeProvider } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import { usei18n } from "../utils/usei18n";

const App = ({ Component, pageProps }) => {
  const { push, pathname: pathName, asPath, locale } = useRouter();
  const storedDarkModeString = process.browser
    ? window.localStorage.getItem("darkMode")
    : true;
  const storedLocaleString = process.browser
    ? window.localStorage.getItem("locale")
    : locale;

  const storedDarkMode = storedDarkModeString === "true";
  const [darkMode, setDarkMode] = useState(storedDarkMode);
  const changeDarkMode = (darkMode: boolean) => {
    setDarkMode(darkMode);
    if (process.browser) {
      window.localStorage.setItem("darkMode", `${darkMode}`);
    }
    document.body.style["color-scheme"] = darkMode ? "dark" : "light";
  };
  const changeLocale = (locale: string) => {
    push(pathName, asPath, { locale });
    if (process.browser) {
      window.localStorage.setItem("locale", locale);
    }
  };
  const t = usei18n(locale);
  useEffect(() => {
    if (!storedDarkModeString || storedDarkModeString === "null") {
      changeDarkMode(false);
    }
  });
  useEffect(() => {
    if (!storedLocaleString || storedLocaleString === "null") {
      changeLocale(locale);
    } else if (locale !== storedLocaleString) {
      changeLocale(storedLocaleString);
    }
  }, [storedLocaleString]);
  useEffect(() => {
    document.body.classList.add(darkMode ? "bg-dark-med" : "bg-light-med");
    document.body.style["color-scheme"] = darkMode ? "dark" : "light";
  });
  return (
    <Auth0Provider
      domain="zenika.eu.auth0.com"
      clientId="DgnUjXulP4ijDqQLsFTDKw3e12wHN2Gt"
      audience="https://zenika.eu.auth0.com/api/v2/"
      scope="read:current_user"
      redirectUri={config.nextPublicBaseUrl}
      useRefreshTokens={true}
      connection={config.nextPublicAuth0Connection}
    >
      <DarkModeProvider value={{ darkMode, changeDarkMode }}>
        <i18nContext.Provider value={{ t, changeLocale }}>
          <GraphQLProvider>
            <Head>
              <title>skillZ</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
              />
            </Head>
            <div className={`${darkMode ? "dark" : ""}`}>
              <div className="w-full min-h-screen overflow-x-hidden flex flex-auto flex-col text-base bg-light-med dark:bg-dark-med  text-light-graytext dark:text-dark-graytext">
                <Component {...{ pathName, ...pageProps }} />
              </div>
            </div>
          </GraphQLProvider>
        </i18nContext.Provider>
      </DarkModeProvider>
    </Auth0Provider>
  );
};

export default App;
