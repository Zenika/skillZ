import { ReactRelayContext } from "react-relay";
import { UserProvider } from "@auth0/nextjs-auth0";
import { useEnvironment } from "../utils/relay";
import Head from "next/head";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";
import { usei18n } from "../utils/usei18n";
import { useRouter } from "next/router";
import { i18nContext } from "../utils/i18nContext";
import { useState } from "react";

const App = ({ Component, pageProps }) => {
  const environment = useEnvironment(pageProps.initialRecords);
  const { push, pathname, asPath, query, locale } = useRouter();
  const changeLocale = (locale: string) => {
    push(pathname, asPath, { locale });
  };
  const t = usei18n(locale);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <UserProvider>
      <i18nContext.Provider value={{ t, changeLocale }}>
        <ReactRelayContext.Provider value={{ environment }}>
          <Head>
            <title>ZProfile</title>
            <link rel="icon" href="/icon.svg" />
          </Head>
          <div className={`${darkMode ? "dark" : ""} + w-screen min-h-screen`}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Component {...pageProps} />
          </div>
        </ReactRelayContext.Provider>
      </i18nContext.Provider>
    </UserProvider>
  );
};

export default App;
