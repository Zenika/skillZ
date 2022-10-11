import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import { BotNotifications } from "./BotNotifications";
import { DarkModeSelector } from "./DarkModeSelector";
import { LocaleSelector } from "./LocaleSelector";

const SidePanel = () => {
  const { locale } = useRouter();
  const { error, user } = useAuth0();
  const { t, changeLocale } = useContext(i18nContext);
  const { darkMode, changeDarkMode } = useDarkMode();

  if (error) {
    console.error(
      `Something bad happened while authenticating user: ${error.message}`
    );
    return;
  }

  return (
    <div className="flex flex-col justify-between h-1/3 p-6 z-50">
      <div className="flex flex-row">
        <Image
          className="rounded-full"
          src={user?.picture || ""}
          alt={user?.name}
          width="64"
          height="64"
        />
        <div className="flex flex-col pl-4">
          <h1 className="font-bold text-xl">{user.name}</h1>
        </div>
      </div>
      <ul className="flex flex-col justify-around p-2 mt-4">
        <li className="p-3 hover:bg-light-med dark:hover:bg-dark-med">
          <Link href="/profile">
            <div className="flex flex-row cursor-pointer">
              <Image
                src={`/icons/${darkMode ? "dark" : "light"}/profile.svg`}
                alt={"Profile"}
                width="16"
                height="16"
              />
              <p className="pl-4">{t("sidepanel.profile")}</p>
            </div>
          </Link>
        </li>
        <li className="p-3 hover:bg-light-med dark:hover:bg-dark-med">
          <Link href="/logout">
            <div className="flex flex-row cursor-pointer">
              <Image
                src={`/icons/${darkMode ? "dark" : "light"}/logout.svg`}
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
        <li className="p-4">
          <LocaleSelector locale={locale} changeLocale={changeLocale} t={t} />
        </li>
        <li className="p-4">
          <DarkModeSelector
            darkMode={darkMode}
            changeDarkMode={changeDarkMode}
            t={t}
          />
        </li>
        <li className="p-4">
          <BotNotifications t={t}></BotNotifications>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
