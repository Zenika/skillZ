import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AuthProvider from "../providers/AuthProvider";
import GraphQLProvider from "../providers/GraphQLProvider";
import "../styles/404.css";
import "../styles/globals.css";
import { DarkModeProvider } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import { TutorialModeProvider } from "../utils/tutorialMode";
import { usei18n } from "../utils/usei18n";

const App = ({ Component, pageProps }) => {
  /*
   * HOOKS
   */
  const { push, pathname: pathName, asPath, locale } = useRouter();
  const t = usei18n(locale);

  /*
   * STATES
   */
  const [mounted, setMounted] = useState(false);

  const storedDarkMode = process.browser
    ? window.localStorage.getItem("darkMode")
    : "false";
  const storedLocaleString = process.browser
    ? window.localStorage.getItem("locale")
    : locale;

  const [darkMode, setDarkMode] = useState(storedDarkMode === "true");
  const [tutorialMode, setTutorialMode] = useState(false);

  const changeTutorialMode = (tutorialMode: boolean) => {
    setTutorialMode(tutorialMode);
  };

  const changeDarkMode = (darkMode: boolean) => {
    setDarkMode(darkMode);
    if (process.browser) {
      window.localStorage.setItem("darkMode", `${darkMode}`);
    }
    document.body.style["color-scheme"] = darkMode ? "dark" : "light";
  };

  const changeLocale = useCallback(
    (locale: string) => {
      push(pathName, asPath, { locale });
      if (process.browser) {
        window.localStorage.setItem("locale", locale);
      }
    },
    [asPath, pathName, push]
  );

  useEffect(() => {
    if (!storedLocaleString || storedLocaleString === "null") {
      changeLocale(locale);
    } else if (locale !== storedLocaleString) {
      changeLocale(storedLocaleString);
    }
  }, [storedLocaleString, changeLocale, locale]);

  useEffect(() => {
    document.body.classList.add(darkMode ? "bg-dark-med" : "bg-light-med");
    document.body.style["color-scheme"] = darkMode ? "dark" : "light";
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <AuthProvider>
      <DarkModeProvider value={{ darkMode, changeDarkMode }}>
        <i18nContext.Provider value={{ t, changeLocale }}>
          <TutorialModeProvider value={{ tutorialMode, changeTutorialMode }}>
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
          </TutorialModeProvider>
        </i18nContext.Provider>
      </DarkModeProvider>
    </AuthProvider>
  );
};

export default App;
