import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import CommonPage from "../components/CommonPage";
import { i18nContext } from "../utils/i18nContext";

export default function Custom404() {
  const { t } = useContext(i18nContext);
  return (
    <CommonPage page={"404"} faded={false}>
      <div className="container mx-auto pt-40">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              {t("error.title404")}
            </p>
            <p className="mb-8">{t("error.text404")} </p>

            <Link href={"/"}>
              <button className="bg-light-panel dark:bg-dark-panel flex-grow-0 rounded-full py-3 px-6 mx-6">
                {t("error.button404")}
              </button>
            </Link>
          </div>
          <div className="max-w-lg">
            <Image
              alt={"Zenika Duck"}
              src={`/canard.png`}
              width="200"
              height="200"
              className={"duck-404"}
            />
          </div>
        </div>
      </div>
    </CommonPage>
  );
}
