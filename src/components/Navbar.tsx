import React, { Dispatch, SetStateAction, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { i18nContext } from "../utils/i18nContext";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({
  path,
}: {
  path: string;
}) => {
  const { isLoading, error, user } = useAuth0();
  const { t } = useContext(i18nContext);
  if (error) {
    console.error(
      `Something bad happened while authenticating user: ${error.message}`
    );
    return;
  }
  return (
    <header className="flex flex-auto flex-row justify-around bg-red-800 dark:bg-dark-dark dark:text-dark-graytext inset-x-0 bottom-0 fixed shadow-2xl">
      <Link href="/">
        <div className="flex flex-initial flex-col justify-between">
          {path === "/" ? (
            <Image src="/icons/nav-selected.svg" width="25" height="2" />
          ) : (
            <div className="h-px" />
          )}
          <Image
            src={
              path === "/" ? "/icons/skills-selected.svg" : "/icons/skills.svg"
            }
            width="25"
            height="25"
            className="p-1"
          />
          <div>{t("nav.my-skills")}</div>
        </div>
      </Link>
      {!isLoading &&
        (user ? (
          <Link href="/zenika">
            <div className="flex flex-initial flex-col justify-between">
              {path === "/zenika" ? (
                <Image src="/icons/nav-selected.svg" width="25" height="2" />
              ) : (
                <div className="h-px" />
              )}
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
              <div>{t("nav.zenika-skills")}</div>
            </div>
          </Link>
        ) : (
          <></>
        ))}
      <Link href="/search">
        <div className="flex flex-initial flex-col justify-between">
          {path === "/search" ? (
            <Image src="/icons/nav-selected.svg" width="25" height="2" />
          ) : (
            <div className="h-px" />
          )}
          <Image
            src={
              path === "/search" ? "/icons/search-selected.svg" : "/icons/search.svg"
            }
            width="25"
            height="25"
            className="p-1"
          />
          <div>{t("nav.search")}</div>
        </div>
      </Link>
    </header>
  );
};

export default Navbar;
