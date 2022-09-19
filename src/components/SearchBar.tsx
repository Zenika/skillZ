import { useContext } from "react";
import { i18nContext } from "../utils/i18nContext";
import styles from "./SearchBar.module.css";

const SearchBar = ({
  setSearch,
  value,
  initialValue,
  placeholder,
}: {
  setSearch;
  value: string;
  initialValue?: string;
  placeholder?: string;
}) => {
  const { t } = useContext(i18nContext);
  return (
    <input
      type="text"
      value={value ?? initialValue}
      placeholder={placeholder ?? t("skills.searchPlaceholder")}
      onChange={(e) => setSearch(e?.target?.value || "")}
      className={`bg-light-light dark:bg-dark-light w-full rounded-full p-4 bg-right ${styles.search}`}
    />
  );
};

export default SearchBar;
