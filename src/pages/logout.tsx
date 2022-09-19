import { useAuth0 } from "@auth0/auth0-react";
import { config } from "../env";

const Logout = () => {
  const { logout } = useAuth0();
  logout({ returnTo: config.nextPublicBaseUrl });
  return <></>;
};

export default Logout;
