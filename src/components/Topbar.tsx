import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../utils/i18nContext";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import Link from "next/link";

const Topbar = ({
  path,
  togglePanel,
}: {
  path?: string;
  togglePanel: () => void;
}) => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
  } = useAuth0();
  const { t, changeLocale } = useContext(i18nContext);

  const onPictureClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    togglePanel();
  };

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });

  if (error) {
    console.error(
      `Something bad happened while authenticating user: ${error.message}`
    );
    return;
  }
  return (
    <div className="flex flex-auto flex-row flex-grow-1 justify-between bg-red-800 dark:bg-gray-900 text-white p-4">
      <Image src="/icons/logo.svg" height="35" width="105" />
      {isDesktop && path !== undefined ? (
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-around">
            <div className="w-36">
              <Link href="/">
                <div className="flex flex-initial flex-col justify-between">
                  <Image
                    src={
                      path === "/"
                        ? "/icons/skills-selected.svg"
                        : "/icons/skills.svg"
                    }
                    width="25"
                    height="25"
                    className="p-1"
                  />
                  <span className="text-center">{t("nav.mySkills")}</span>
                </div>
              </Link>
            </div>
            <div className="w-36">
              <Link href="/zenika">
                <div className="flex flex-initial flex-col justify-between">
                  <Image
                    src={
                      path === "/zenika"
                        ? "/icons/zenika-selected.svg"
                        : "/icons/zenika.svg"
                    }
                    width="25"
                    height="25"
                    className="p-1"
                  />
                  <span className="text-center">{t("nav.zenikaSkills")}</span>
                </div>
              </Link>
            </div>
            <div className="w-36">
              <Link href="/search">
                <div className="flex flex-initial flex-col justify-between">
                  <Image
                    src={
                      path === "/search"
                        ? "/icons/search-selected.svg"
                        : "/icons/search.svg"
                    }
                    width="25"
                    height="25"
                    className="p-1"
                  />
                  <span className="text-center">{t("nav.search")}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <button onClick={() => onPictureClick()}>
        <img className="w-16 h-16 rounded-full" src={user?.picture || ""} />
      </button>
    </div>
  );
};

export default Topbar;
