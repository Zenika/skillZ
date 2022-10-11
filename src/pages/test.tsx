import React, { useContext } from "react";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import { i18nContext } from "../utils/i18nContext";

export default function Custom404() {
  const { t } = useContext(i18nContext);
  return <PageWithNavAndPanel></PageWithNavAndPanel>;
}
