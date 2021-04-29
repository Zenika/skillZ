import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../utils/i18nContext";
import { gql } from "graphql-tag";
import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import Link from "next/link";

const GET_USER_AGENCY_QUERY = gql`
  query getUserAgency($email: String!) {
    UserAgency(where: { userEmail: { _eq: $email } }) {
      agency
    }
  }
`;

type UserAgencyResult = {
  UserAgency: { agency: string }[];
};

const Topbar = ({
  path,
  context,
  togglePanel,
}: {
  path?: string;
  context: string | string[];
  togglePanel: () => void;
}) => {
  const { isAuthenticated, error, user, loginWithRedirect } = useAuth0();
  const { t } = useContext(i18nContext);
  const [openMenu, setOpenMenu] = useState(false);
  const onPictureClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    togglePanel();
  };

  const { data: userAgencyResult } = useQuery<UserAgencyResult>(
    GET_USER_AGENCY_QUERY,
    {
      variables: { email: user.email },
      fetchPolicy: "network-only",
    }
  );

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
    <div className="flex flex-row justify-center h-24 bg-red-800 dark:bg-dark-dark">
      <div
        className={`flex flex-auto flex-row flex-grow-1 justify-between text-white max-w-screen-lg ${
          !isDesktop ? "p-4" : ""
        }`}
      >
        <div className="flex justify-start w-1/3">
          <Image src="/icons/logo.svg" height="35" width="105" />
        </div>
        <div className="flex justify-center w-1/3">
          {isDesktop && path !== undefined ? (
            <div className="flex flex-col justify-center p-4">
              <div className="flex flex-row justify-around">
                <div className="w-36">
                  <Link href="/">
                    <div className="flex flex-initial flex-col justify-between">
                      <Image
                        src={
                          context === "mine" || path === "/"
                            ? "/icons/skills-selected.svg"
                            : "/icons/skills.svg"
                        }
                        width="25"
                        height="25"
                        className="p-1"
                      />
                      <span className="text-center">{t("nav.mySkills")}</span>
                      {context === "mine" || path === "/" ? (
                        <div className="flex flex-row justify-center w-full h-0.5">
                          <div className="w-3/4 h-full gradient-red" />
                        </div>
                      ) : (
                        <div className="h-px" />
                      )}
                    </div>
                  </Link>
                </div>
                <div className="w-36">
                  <Link href="/zenika">
                    <div className="flex flex-initial flex-col justify-between">
                      <Image
                        src={
                          context === "zenika" || path === "/zenika"
                            ? "/icons/zenika-selected.svg"
                            : "/icons/zenika.svg"
                        }
                        width="25"
                        height="25"
                        className="p-1"
                      />
                      <span className="text-center">
                        {t("nav.zenikaSkills")}
                      </span>
                      {context === "zenika" || path === "/zenika" ? (
                        <div className="flex flex-row justify-center w-full h-0.5">
                          <div className="w-3/4 h-full gradient-red" />
                        </div>
                      ) : (
                        <div className="h-px" />
                      )}
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
                      {path === "/search" ? (
                        <div className="flex flex-row justify-center w-full h-0.5">
                          <div className="w-3/4 h-full gradient-red" />
                        </div>
                      ) : (
                        <div className="h-px" />
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-end w-1/3">
          {!isDesktop ? (
            <button onClick={() => onPictureClick()}>
              <img
                className="w-16 h-16 rounded-full"
                src={user?.picture || ""}
              />
            </button>
          ) : (
            <div className="z-20">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex flex-row px-2 py-4 justify-between bg-dark-ultradark h-full"
              >
                <div className="flex flex-col px-2 justify-center">
                  <span className="font-bold">{user?.name}</span>
                  <span>
                    Zenika{" "}
                    {t(`agencies.${userAgencyResult?.UserAgency[0]?.agency}`)}
                  </span>
                </div>
                <img
                  className="w-16 h-16 rounded-full"
                  src={user?.picture || ""}
                />
              </button>
              <div
                className={`bg-dark-ultradark py-2 ${
                  !openMenu ? "hidden" : ""
                }`}
              >
                <ul className="flex flex-col justify-around h-full pl-2">
                  <li className="p-2">
                    <Link href="/profile">
                      <div className="flex flex-row pl-4">
                        <Image
                          src="/icons/profile.svg"
                          width="16"
                          height="16"
                        />
                        <p className="pl-4">{t("sidepanel.profile")}</p>
                      </div>
                    </Link>
                  </li>
                  <li className="p-2">
                    <Link href="/logout">
                      <div className="flex flex-row pl-4">
                        <Image src="/icons/logout.svg" width="18" height="18" />
                        <p className="pl-4">{t("sidepanel.logout")}</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
