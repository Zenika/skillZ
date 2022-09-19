import { useContext } from "react";
import { i18nContext } from "../utils/i18nContext";

const ErrorPage = () => {
  const { t } = useContext(i18nContext);
  return <div>{t("error.unknown")}</div>;
};

export default ErrorPage;
