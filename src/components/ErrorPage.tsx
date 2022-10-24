import { useRouter } from "next/router";
import { useContext } from "react";
import { i18nContext } from "../utils/i18nContext";
import Button from "./Button";

const ErrorPage = () => {
  const { t } = useContext(i18nContext);
  const { reload } = useRouter();

  return (
    <div className="flex h-screen">
      <div className="m-auto flex flex-col">
        <h3>{t("error.unknown")}</h3>
        <Button text={t("error.refetch")} type={"primary"} callback={reload} />
      </div>
    </div>
  );
};

export default ErrorPage;
