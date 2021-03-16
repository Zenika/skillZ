import React, { useContext } from "react";
import { i18nContext } from "../utils/i18nContext";
import styles from "./SearchBar.module.css";

const SearchBar = ({ setSearch }) => {
  const { t } = useContext(i18nContext);
  return (
    <input
      type="text"
      placeholder={t("skills.searchPlaceholder")}
      onChange={(e) => setSearch(e?.target?.value || "")}
      className={`dark:bg-dark-light w-full rounded-full p-4 bg-search ${styles.search}`}
    />
  );
};

export default SearchBar;
