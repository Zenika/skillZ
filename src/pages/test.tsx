import React, { useContext } from "react";
import CommonPage from "../components/CommonPage";
import { i18nContext } from "../utils/i18nContext";

export default function Custom404() {
  const { t } = useContext(i18nContext);
  return <CommonPage></CommonPage>;
}
