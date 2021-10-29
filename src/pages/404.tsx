import { i18nContext } from "../utils/i18nContext";
import React, { useContext } from "react";

export default function Custom404() {
  const { t } = useContext(i18nContext);
  return (
    <div className="container mx-auto px-4">
      <section className="py-8 px-4 text-center">
        <div className="max-w-auto mx-auto">
          <div className="md:max-w-lg mx-auto"></div>
          <h2 className="mt-8 uppercase text-xl lg:text-5xl font-black">
            {t("error.title404")}
          </h2>
          <p className="mt-6 uppercase text-sm lg:text-base text-gray-900">
            {t("error.text404")}
          </p>
          <a
            href="/"
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-light py-4 px-6 rounded-full inline-block uppercase shadow-md"
          >
            {t("error.button404")}
          </a>
        </div>
      </section>
    </div>
  );
}
