import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Button from "../components/Button";
import CommonPage from "../components/CommonPage";
import { i18nContext } from "../utils/i18nContext";

export default function Custom404() {
  const { t } = useContext(i18nContext);
  const { push } = useRouter();

  return (
    <CommonPage page={"404"}>
      <div className="container mx-auto pt-40">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              {t("error.title404")}
            </p>
            <p className="mb-8">{t("error.text404")} </p>
            <Button
              text={t("error.button404")}
              type={"secondary"}
              callback={() => push("/")}
            />
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
