import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { usei18n } from "../../utils/usei18n";
import { useUser } from "@auth0/nextjs-auth0";

export default function Navbar() {
  const { push, pathname, asPath, query, locale } = useRouter();
  const { isLoading, user } = useUser();

  const t = usei18n(locale);
  const changeTranslation = (locale: string) => {
    push(pathname, asPath, { locale });
  };

  return (
    <header className="flex flex-auto flex-row justify-center bg-red-800 dark:bg-gray-800 text-white">
      <div className="flex flex-auto flex-row justify-start p-2">
        <Link href="/">
          <div className="p-2">{t("nav.home")}</div>
        </Link>
        {!isLoading &&
          (user ? (
            <Link href="/profile">
              <div className="p-2">{t("nav.profile")}</div>
            </Link>
          ) : (
            <></>
          ))}
      </div>
      <div className="flex flex-auto justify-center">
        <h1 className="p-4">ZProfile</h1>
      </div>
      <div className="flex flex-auto flex-row justify-end p-2">
        <div className="flex flex-auto flex-row justify-end">
          <a className="p-2" onClick={() => changeTranslation("en")}>
            EN
          </a>
          <a className="p-2" onClick={() => changeTranslation("fr")}>
            FR
          </a>
        </div>
        <div className="flex flex-auto flex-row justify-end p-2">
          {!isLoading &&
            (user ? (
              <a href="/api/auth/logout">
                <button>Log out</button>
              </a>
            ) : (
              <a href="/api/auth/login">
                <button>Log in</button>
              </a>
            ))}
        </div>
      </div>
    </header>
  );
}
