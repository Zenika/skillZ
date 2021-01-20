import { useRouter } from "next/router";
import { usei18n } from "../utils/usei18n";

const Loading = () => {
  const { locale } = useRouter();
  const t = usei18n(locale);
  return <div>{t("loading.loadingText")}</div>;
};

export default Loading;
