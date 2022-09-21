import { useRouter } from "next/router";
import { useContext } from "react";
import { i18nContext } from "../utils/i18nContext";

const ErrorPage = () => {
  const { t } = useContext(i18nContext);
  const { reload } = useRouter();

  return (
    <div className="flex h-screen">
      <div className="m-auto flex flex-col">
        <h3>{t("error.unknown")}</h3>
        <button
          className="mx-4 mt-2 px-5 py-2 gradient-red rounded-full disabled:opacity-25"
          onClick={reload}
        >
          {t("error.refetch")}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
