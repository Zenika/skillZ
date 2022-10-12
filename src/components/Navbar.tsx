import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";

const Navbar = () => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const { pathname } = useRouter();

  return (
    <header className="z-50 flex flex-auto flex-row justify-around h-16 bg-red-800 bg-light-light dark:bg-dark-dark text-light-graytext dark:text-dark-graytext inset-x-0 bottom-0 overflow-hidden fixed shadow-2xl">
      <div className="w-1/3">
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
      </div>
      <div className="w-1/3">
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
      </div>
      <div className="w-1/3">
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
      </div>
    </header>
  );
};

export default Navbar;
