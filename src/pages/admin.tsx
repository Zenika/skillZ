import Link from "next/link";
import React, { useContext } from "react";
import CommonPage from "../components/CommonPage";
import { i18nContext } from "../utils/i18nContext";
import { useMediaQuery } from "react-responsive";

export default function AdminPage() {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  const { t } = useContext(i18nContext);

  return (
    <CommonPage page={"Admin"} backBar={false}>
      <div className={"flex justify-center"}>
        <div className={`${isDesktop ? "w-2/3" : "w-full"}`}></div>
      </div>
    </CommonPage>
  );
}
