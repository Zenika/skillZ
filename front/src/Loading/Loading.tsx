import React from "react";
import { useTranslation } from "react-i18next";

const Loading: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t("loading.loadingText")} ...</p>
    </div>
  );
};

export default Loading;
