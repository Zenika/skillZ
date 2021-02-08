import React, { useContext } from "react";
import { i18nContext } from "../utils/i18nContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import styles from "./Topbar.module.css";

const Topbar = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const { t, changeLocale } = useContext(i18nContext);
  const { push } = useRouter();

  const onProfileClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    push("/profile");
  };

  if (error) {
    console.error(
      `Something bad happened while authenticating user: ${error.message}`
    );
    return;
  }

  return (
    <div className="flex flex-auto flex-row flex-grow-0 justify-between bg-red-800 dark:bg-gray-900 text-white p-4">
      <h1 className="text-5xl font-bold text-dark-graytext">
        sk<span className={styles.i}>i</span>ll
        <span className={`font-normal ${styles.zgradient}`}>Z</span>
      </h1>
      <button onClick={() => onProfileClick()}>
        <img className="w-16 h-16 rounded-full" src={user?.picture || ""} />
      </button>
    </div>
  );
};

export default Topbar;
