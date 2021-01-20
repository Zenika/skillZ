import { ReactRelayContext } from "react-relay";
import { UserProvider } from "@auth0/nextjs-auth0";
import { useEnvironment } from "../utils/relay";
import Head from "next/head";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }) => {
  const environment = useEnvironment(pageProps.initialRecords);
  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default App;
