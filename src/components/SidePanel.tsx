import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { i18nContext } from "../utils/i18nContext";
import { useAuth0 } from "@auth0/auth0-react";
import { LocaleSelector } from "./LocaleSelector";
import { DarkModeSelector } from "./DarkModeSelector";
import { useDarkMode } from "../utils/darkMode";
import { useRouter } from "next/router";

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
    <div className="flex flex-col justify-between h-1/3 p-6">
      <div className="flex flex-row">
        <Image
          className="rounded-full"
          src={user?.picture || ""}
          width="64"
          height="64"
        />
        <div className="flex flex-col pl-4">
          <h1 className="font-bold text-xl">{user.name}</h1>
        </div>
      </div>
      <ul className="flex flex-col justify-around h-full mt-4 pl-4">
        <li>
          <Link href="/profile">
            <div className="flex flex-row pl-4 cursor-pointer">
              <Image
                src={`/icons/${darkMode ? "dark" : "light"}/profile.svg`}
                width="16"
                height="16"
              />
              <p className="pl-4">{t("sidepanel.profile")}</p>
            </div>
          </Link>
        </li>
        <li className="p-2">
          <LocaleSelector locale={locale} changeLocale={changeLocale} t={t} />
        </li>
        <li className="p-2">
          <DarkModeSelector
            darkMode={darkMode}
            changeDarkMode={changeDarkMode}
            t={t}
          />
        </li>
        <li>
          <Link href="/logout">
            <div className="flex flex-row pl-4 cursor-pointer">
              <Image
                src={`/icons/${darkMode ? "dark" : "light"}/logout.svg`}
                width="18"
                height="18"
              />
              <p className="pl-4">{t("sidepanel.logout")}</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
