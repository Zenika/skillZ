import { Auth0Provider } from "use-auth0-hooks";
import { useRouter } from "next/router";
import { ReactRelayContext } from "react-relay";
import { useEnvironment } from "../utils/relay";
import Head from "next/head";
import Navbar from "../components/Navbar/navbar";
import "tailwindcss/tailwind.css";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function App({ Component, pageProps }) {
  const environment = useEnvironment(pageProps.initialRecords);
  return (
    <Auth0Provider
      domain="zenika.eu.auth0.com"
      clientId="DgnUjXulP4ijDqQLsFTDKw3e12wHN2Gt"
      redirectUri={BASE_URL}
      audience="https://zenika.eu.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <ReactRelayContext.Provider value={{ environment }}>
        <Head>
          <title>ZProfile</title>
          <link rel="icon" href="/icon.svg" />
        </Head>
        <div className="ndark w-screen min-h-screen">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ReactRelayContext.Provider>
    </Auth0Provider>
  );
}
