import { useContext } from "react";
import { i18nContext } from "../utils/i18nContext";

const Loading = () => {
  const { t } = useContext(i18nContext);
  return <div>{t("loading.loadingText")}</div>;
};

export default Loading;
