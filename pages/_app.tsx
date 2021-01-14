import { Auth0Provider } from "use-auth0-hooks";
import Navbar from "../components/navbar";
import "../styles/globals.css";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function App({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="zenika.eu.auth0.com"
      clientId="DgnUjXulP4ijDqQLsFTDKw3e12wHN2Gt"
      redirectUri={BASE_URL}
      audience="https://zenika.eu.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <>
      <Navbar />
      <Component {...pageProps} />
      </>
    </Auth0Provider>
  );
}
