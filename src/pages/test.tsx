import React, { useContext } from "react";
import Button from "../components/Button";
import { i18nContext } from "../utils/i18nContext";

export default function Custom404() {
  const { t } = useContext(i18nContext);
  return <Button type={"secondary"} text={"Test"} callback={() => {}} />;
}
