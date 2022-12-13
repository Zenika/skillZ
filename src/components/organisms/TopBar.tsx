import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { config } from "../../env";
import {
  GetAllNotVerifiedSkillsQuery,
  GetUserAgencyQuery,
  GetUserQuery,
} from "../../generated/graphql";
import { GET_ALL_NOT_VERIFIED_SKILL } from "../../graphql/queries/skills";
import {
  GET_USER_AGENCY_QUERY,
  GET_USER_QUERY,
} from "../../graphql/queries/userInfos";
import { useDarkMode } from "../../utils/darkMode";
import { i18nContext } from "../../utils/i18nContext";
import { BotNotifications } from "../molecules/BotNotifications";
import { DarkModeSelector } from "../molecules/DarkModeSelector";
import { LocaleSelector } from "../molecules/LocaleSelector";

export type TopBarProps = {
  togglePanel: () => void;
};

const TopBar = ({ togglePanel }: TopBarProps) => {
  const { isAuthenticated, error, user, loginWithRedirect } = useAuth0();
  const { t, changeLocale } = useContext(i18nContext);
  const { darkMode, changeDarkMode } = useDarkMode();
  const { locale, query, pathname } = useRouter();
  let { context } = query;

  /*
   * STATES
   */
  const [openMenu, setOpenMenu] = useState(false);

  /*
   * QUERIES
   */
  const { data: userAgencyResult } = useQuery<GetUserAgencyQuery>(
    GET_USER_AGENCY_QUERY,
    {
      variables: { email: user.email },
      fetchPolicy: "network-only",
    }
  );

  const { data: userData } = useQuery<GetUserQuery>(GET_USER_QUERY, {
    variables: { email: user.email },
    fetchPolicy: "network-only",
  });

  const { data: skills, error: errorSkills } =
    useQuery<GetAllNotVerifiedSkillsQuery>(GET_ALL_NOT_VERIFIED_SKILL, {
      fetchPolicy: "network-only",
    });

  /*
   * CALLBACKS
   */
  const onPictureClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    togglePanel();
  };

  /*
   * HOOKS
   */
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  if (error || errorSkills) {
    console.error(`Something bad happened: ${error.message}`);
    return <></>;
  }

  return (
    <div className="flex flex-row justify-center h-24">
      <div
        className={`flex flex-auto flex-row flex-grow-1 justify-between max-w-screen-xl ${
          !isDesktop ? "p-4" : ""
        }`}
      >
        <div className="flex cursor-pointer justify-start w-1/3">
          <Link href="/">
            <Image
              src={`/icons/${darkMode ? "dark" : "light"}/logo.svg`}
              alt={"Logo"}
              height="35"
              width="105"
            />
          </Link>
        </div>
        <div className="flex justify-center h-full w-1/3">
          {isDesktop && (
            <div className="flex flex-col justify-center px-4 h-full">
              <div className="flex flex-row justify-around h-full items-center">
                <div className="w-36">
                  <Link href="/">
                    <div className="flex flex-initial flex-col justify-between cursor-pointer h-full py-4 hover:bg-light-dark hover:dark:bg-dark-radargrid">
                      <Image
                        src={
                          context === "mine" || pathname === "/"
                            ? `/icons/${
                                darkMode ? "dark" : "light"
                              }/skills-selected.svg`
                            : `/icons/${darkMode ? "dark" : "light"}/skills.svg`
                        }
                        alt={"Skill"}
                        width="25"
                        height="25"
                        className="p-1"
                      />
                      <span className="text-center">{t("nav.mySkills")}</span>
                      {context === "mine" ||
                        (pathname === "/" && (
                          <div className="flex flex-row justify-center w-full h-0.5">
                            <div className="w-3/4 h-full gradient-red" />
                          </div>
                        ))}
                    </div>
                  </Link>
                </div>
                <div className="w-36">
                  <Link href="/zenika">
                    <div className="flex flex-initial flex-col justify-between cursor-pointer h-full py-4 hover:bg-light-dark hover:dark:bg-dark-radargrid">
                      <Image
                        src={
                          context === "zenika" || pathname === "/zenika"
                            ? `/icons/${
                                darkMode ? "dark" : "light"
                              }/zenika-selected.svg`
                            : `/icons/${darkMode ? "dark" : "light"}/zenika.svg`
                        }
                        alt={"Zenika"}
                        width="25"
                        height="25"
                        className="p-1"
                      />
                      <span className="text-center">
                        {t("nav.zenikaSkills")}
                      </span>
                      {context === "zenika" ||
                        (pathname === "/zenika" && (
                          <div className="flex flex-row justify-center w-full h-0.5">
                            <div className="w-3/4 h-full gradient-red" />
                          </div>
                        ))}
                    </div>
                  </Link>
                </div>
                <div className="w-36">
                  <Link href="/search">
                    <div className="flex flex-initial flex-col justify-between cursor-pointer h-full py-4 hover:bg-light-dark hover:dark:bg-dark-radargrid">
                      <Image
                        src={
                          pathname === "/search"
                            ? `/icons/${
                                darkMode ? "dark" : "light"
                              }/search-selected.svg`
                            : `/icons/${darkMode ? "dark" : "light"}/search.svg`
                        }
                        alt={"Search"}
                        width="25"
                        height="25"
                        className="p-1"
                      />
                      <span className="text-center">{t("nav.search")}</span>
                      {pathname === "/search" && (
                        <div className="flex flex-row justify-center w-full h-0.5">
                          <div className="w-3/4 h-full gradient-red" />
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
                {user.email ===
                  config.nextPublicAdmins
                    .split(";")
                    .find((admin) => admin === user.email) && (
                  <div className="w-36">
                    <Link href="/admin">
                      <div className="flex flex-initial flex-col justify-between cursor-pointer h-full py-4 relative hover:bg-light-dark hover:dark:bg-dark-radargrid">
                        <Image
                          src={
                            pathname === "/admin"
                              ? `/icons/${
                                  darkMode ? "dark" : "light"
                                }/zenika-selected.svg`
                              : `/icons/${
                                  darkMode ? "dark" : "light"
                                }/zenika.svg`
                          }
                          alt={"admin"}
                          width="25"
                          height="25"
                          className="p-1"
                        />
                        {skills && (
                          <div
                            className={
                              "absolute top-1 right-5 inline-flex justify-center items-center w-5 h-5 text-xs font-bold text-light-ultrawhite bg-dark-red rounded-full dark:border-gray-900"
                            }
                          >
                            {skills.Skill.length}
                          </div>
                        )}

                        <span className="text-center">Admin</span>
                        {pathname === "/admin" && (
                          <div className="flex flex-row justify-center w-full h-0.5">
                            <div className="w-3/4 h-full gradient-red" />
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end w-1/3">
          {!isDesktop && (
            <button onClick={() => onPictureClick()}>
              <Image
                src={user?.picture || ""}
                className="rounded-full"
                alt={user?.name}
                height="64"
                width="64"
              />
            </button>
          )}
          {isDesktop && (
            <div className="divide-y divide-dark-radargrid divide-light-radargrid hover:bg-light-dark hover:dark:bg-dark-radargrid">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex flex-row items-center px-2 py-4 justify-between h-full"
              >
                <div className="flex flex-col px-2 justify-center">
                  <span className="font-bold">{user?.name}</span>
                  {userAgencyResult?.UserLatestAgency[0]?.agency && (
                    <p className={"text-sm"}>
                      {`Zenika ${userAgencyResult?.UserLatestAgency[0]?.agency}`}
                    </p>
                  )}
                  {userData && userData.User[0] && (
                    <p className={"text-xs"}>{`${t(
                      "myProfile.lastLogin"
                    )} : ${new Date(userData.User[0].last_login).toLocaleString(
                      [],
                      {
                        dateStyle: "short",
                      }
                    )}`}</p>
                  )}
                </div>
                <Image
                  src={user?.picture || ""}
                  alt={user?.name}
                  className="rounded-full"
                  height="64"
                  width="64"
                />
              </button>
              <div
                className={`relative bg-light-ultrawhite dark:bg-dark-med shadow rounded-b-md z-50 ${
                  !openMenu && "hidden"
                }`}
              >
                <ul className="flex flex-col justify-around h-full p-2 rounded-b-md border border-light-ultrawhite dark:border-dark-ultradark">
                  <li className="p-2 hover:bg-light-dark hover:dark:bg-dark-radargrid">
                    <Link href={`/profile`}>
                      <div className="flex flex-row cursor-pointer">
                        <Image
                          src={`/icons/${
                            darkMode ? "dark" : "light"
                          }/profile.svg`}
                          alt={"Profile"}
                          width="16"
                          height="16"
                        />
                        <p className="pl-4">{t("sidepanel.profile")}</p>
                      </div>
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-light-dark hover:dark:bg-dark-radargrid">
                    <Link href="/logout">
                      <div className="flex flex-row cursor-pointer">
                        <Image
                          src={`/icons/${
                            darkMode ? "dark" : "light"
                          }/logout.svg`}
                          alt={"Sign out"}
                          width="18"
                          height="18"
                        />
                        <p className="pl-4">{t("sidepanel.logout")}</p>
                      </div>
                    </Link>
                  </li>
                  {/*Separator*/}
                  <div className="flex items-center py-2">
                    <div className="flex-grow h-px dark:bg-dark-radargrid bg-light-radargrid"></div>
                    <span className="flex-shrink text-xs dark:text-dark-graytext text-light-graytext px-4 italic font-light">
                      {t("nav.preferences")}
                    </span>
                    <div className="flex-grow h-px dark:bg-dark-radargrid bg-light-radargrid"></div>
                  </div>
                  {/*Seperator*/}
                  <li className="p-2">
                    <LocaleSelector
                      locale={locale}
                      changeLocale={changeLocale}
                      t={t}
                    />
                  </li>
                  <li className="p-2">
                    <DarkModeSelector
                      darkMode={darkMode}
                      changeDarkMode={changeDarkMode}
                      t={t}
                    />
                  </li>
                  <li className="p-2">
                    <BotNotifications t={t}></BotNotifications>
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

export default TopBar;
