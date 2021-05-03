import { useAuth0 } from "@auth0/auth0-react";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!NEXT_PUBLIC_BASE_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_BASE_URL isn't defined"
  );
}

const Logout = () => {
  const { logout } = useAuth0();
  logout({ returnTo: NEXT_PUBLIC_BASE_URL });
  return <></>;
};

export default Logout;
