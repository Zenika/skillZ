import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { config } from "../../env";
import { GetAllNotVerifiedSkillsQuery } from "../../generated/graphql";
import { GET_ALL_NOT_VERIFIED_SKILL } from "../../graphql/queries/skills";
import { useDarkMode } from "../../utils/darkMode";
import { i18nContext } from "../../utils/i18nContext";

const Navbar = () => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const { pathname } = useRouter();
  const { user } = useAuth0();

  const { data: skills, error: errorSkills } =
    useQuery<GetAllNotVerifiedSkillsQuery>(GET_ALL_NOT_VERIFIED_SKILL, {
      fetchPolicy: "network-only",
    });

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  const numberOfNotifications =
    !errorSkills && skills ? (
      <div className="inline-flex justify-center items-center w-5 h-5 text-xs font-bold text-light-ultrawhite bg-dark-red rounded-full dark:border-gray-900">
        {skills.Skill.length}
      </div>
    ) : null;

  return (
    <header className="p-2 z-50 flex flex-auto flex-row justify-evenly h-16 bg-red-800 bg-light-light dark:bg-dark-dark text-light-graytext dark:text-dark-graytext inset-x-0 bottom-0 overflow-hidden fixed shadow-2xl">
      <Link href="/">
        <div className="flex flex-initial flex-col justify-between cursor-pointer">
          {pathname === "/" ? (
            <Image
              src={`/icons/${darkMode ? "dark" : "light"}/nav-selected.svg`}
              alt={"Line"}
              width="25"
              height="2"
            />
          ) : (
            <div className="h-px" />
          )}
          <Image
            src={
              pathname === "/"
                ? `/icons/${darkMode ? "dark" : "light"}/skills-selected.svg`
                : `/icons/${darkMode ? "dark" : "light"}/skills.svg`
            }
            alt={"Line"}
            width="25"
            height="25"
            className="p-1"
          />
          <span className="text-center">{t("nav.mySkills")}</span>
        </div>
      </Link>
      <Link href="/zenika">
        <div className="flex flex-initial flex-col justify-between cursor-pointer">
          {pathname === "/zenika" ? (
            <Image
              src={`/icons/${darkMode ? "dark" : "light"}/nav-selected.svg`}
              alt={"Line"}
              width="25"
              height="2"
            />
          ) : (
            <div className="h-px" />
          )}
          <Image
            src={
              pathname === "/zenika"
                ? `/icons/${darkMode ? "dark" : "light"}/zenika-selected.svg`
                : `/icons/${darkMode ? "dark" : "light"}/zenika.svg`
            }
            alt={"Line"}
            width="25"
            height="25"
            className="p-1"
          />
          <span className="text-center">{t("nav.zenikaSkills")}</span>
        </div>
      </Link>
      <Link href="/search">
        <div className="flex flex-initial flex-col justify-between cursor-pointer">
          {pathname === "/search" ? (
            <Image
              src={`/icons/${darkMode ? "dark" : "light"}/nav-selected.svg`}
              alt={"Line"}
              width="25"
              height="2"
            />
          ) : (
            <div className="h-px" />
          )}
          <Image
            src={
              pathname === "/search"
                ? `/icons/${darkMode ? "dark" : "light"}/search-selected.svg`
                : `/icons/${darkMode ? "dark" : "light"}/search.svg`
            }
            alt={"Line"}
            width="25"
            height="25"
            className="p-1"
          />
          <span className="text-center">{t("nav.search")}</span>
        </div>
      </Link>
      {user.email ===
        config.nextPublicAdmins
          .split(";")
          .find((admin) => admin === user.email) && (
        <Link href="/admin">
          <div className="flex flex-initial flex-col justify-between cursor-pointer relative items-center">
            {isDesktop ? (
              <>
                <Image
                  src={
                    pathname === "/admin"
                      ? `/icons/${
                          darkMode ? "dark" : "light"
                        }/zenika-selected.svg`
                      : `/icons/${darkMode ? "dark" : "light"}/zenika.svg`
                  }
                  alt={"admin"}
                  width="25"
                  height="25"
                  className="p-1"
                />
                <div className={"absolute top-0 right-5"}>
                  {numberOfNotifications}
                </div>
              </>
            ) : (
              <>{numberOfNotifications}</>
            )}
            <span className="text-center">Admin</span>
            {pathname === "/admin" && (
              <div className="flex flex-row justify-center w-full h-0.5">
                <div className="w-3/4 h-full gradient-red" />
              </div>
            )}
          </div>
        </Link>
      )}
    </header>
  );
};

export default Navbar;