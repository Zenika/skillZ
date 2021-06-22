import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { i18nContext } from "../utils/i18nContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useDarkMode } from "../utils/darkMode";

const Navbar = ({ path }: { path: string }) => {
  const { isLoading, error } = useAuth0();
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  if (error) {
    console.error(
      `Something bad happened while authenticating user: ${error.message}`
    );
    return;
  }
  return (
    <header className="flex flex-auto flex-row justify-around h-16 bg-red-800 bg-light-light dark:bg-dark-dark text-light-graytext dark:text-dark-graytext inset-x-0 bottom-0 overflow-hidden fixed shadow-2xl">
      <div className="w-1/3">
        <Link href="/">
          <div className="flex flex-initial flex-col justify-between cursor-pointer">
            {path === "/" ? (
              <Image
                src={`/icons/${darkMode ? "dark" : "light"}/nav-selected.svg`}
                width="25"
                height="2"
              />
            ) : (
              <div className="h-px" />
            )}
            <Image
              src={
                path === "/"
                  ? `/icons/${darkMode ? "dark" : "light"}/skills-selected.svg`
                  : `/icons/${darkMode ? "dark" : "light"}/skills.svg`
              }
              width="25"
              height="25"
              className="p-1"
            />
            <span className="text-center">{t("nav.mySkills")}</span>
          </div>
        </Link>
      </div>
      <div className="w-1/3">
        <Link href="/zenika">
          <div className="flex flex-initial flex-col justify-between cursor-pointer">
            {path === "/zenika" ? (
              <Image
                src={`/icons/${darkMode ? "dark" : "light"}/nav-selected.svg`}
                width="25"
                height="2"
              />
            ) : (
              <div className="h-px" />
            )}
            <Image
              src={
                path === "/zenika"
                  ? `/icons/${darkMode ? "dark" : "light"}/zenika-selected.svg`
                  : `/icons/${darkMode ? "dark" : "light"}/zenika.svg`
              }
              width="25"
              height="25"
              className="p-1"
            />
            <span className="text-center">{t("nav.zenikaSkills")}</span>
          </div>
        </Link>
      </div>
      <div className="w-1/3">
        <Link href="/search">
          <div className="flex flex-initial flex-col justify-between cursor-pointer">
            {path === "/search" ? (
              <Image
                src={`/icons/${darkMode ? "dark" : "light"}/nav-selected.svg`}
                width="25"
                height="2"
              />
            ) : (
              <div className="h-px" />
            )}
            <Image
              src={
                path === "/search"
                  ? `/icons/${darkMode ? "dark" : "light"}/search-selected.svg`
                  : `/icons/${darkMode ? "dark" : "light"}/search.svg`
              }
              width="25"
              height="25"
              className="p-1"
            />
            <span className="text-center">{t("nav.search")}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
