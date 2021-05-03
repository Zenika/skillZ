import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { i18nContext } from "../utils/i18nContext";
import { useAuth0 } from "@auth0/auth0-react";

const SidePanel = () => {
  const { error, user } = useAuth0();
  const { t, changeLocale } = useContext(i18nContext);

  if (error) {
    console.error(
      `Something bad happened while authenticating user: ${error.message}`
    );
    return;
  }

  return (
    <div className="flex flex-col justify-between h-1/3 p-6">
      <div className="flex flex-row">
        <img className="w-16 h-16 rounded-full" src={user?.picture || ""} />
        <div className="flex flex-col pl-4">
          <h1 className="font-bold text-xl">{user.name}</h1>
        </div>
      </div>
      <ul className="flex flex-col justify-around h-full pl-4">
        <li>
          <Link href="/profile">
            <div className="flex flex-row pl-4 cursor-pointer">
              <Image src="/icons/profile.svg" width="16" height="16" />
              <p className="pl-4">{t("sidepanel.profile")}</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/logout">
            <div className="flex flex-row pl-4 cursor-pointer">
              <Image src="/icons/logout.svg" width="18" height="18" />
              <p className="pl-4">{t("sidepanel.logout")}</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
