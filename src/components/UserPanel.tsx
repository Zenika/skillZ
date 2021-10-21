import { useContext } from "react";
import Image from "next/image";
import { i18nContext } from "../utils/i18nContext";
import router, { useRouter } from "next/router";
import Link from "next/link";
import { useDarkMode } from "../utils/darkMode";
import styles from "./profile/DisablePointer.module.css";

type User = { name: string; picture: string; agency: string; email: string };
const UserPanel = ({ user, context }: { user: User; context: string }) => {
  const { t } = useContext(i18nContext);
  const { name, picture, agency } = user;

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/profile/${user?.email}`);
  };

  return (
    <div
      className="flex flex-row bg-light-light dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`flex flex-col ${context !== "zenika" ? "w-5/6" : "w-full"}`}
      >
        <div className="flex flex-row justify-start">
          <Image
            className="h-16 w-16 rounded-full"
            height="64"
            width="64"
            src={picture || ""}
          />
          <div className="flex flex-col ml-4">
            <div className="flex flex-row">
              <h2 className="text-xl">{name}</h2>
            </div>
            <h3 className="text-md">Zenika {t(`agencies.${agency}`)}</h3>
          </div>
        </div>
      </div>
      {/* <div className="flex w-1/6 justify-end">
        <Image src={`/icons/${darkMode ? "dark" : "light"}/chevron.svg`} width="8" height="12" />
      </div> */}
    </div>
  );
};

export default UserPanel;
