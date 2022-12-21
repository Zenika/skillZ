import { useContext } from "react";
import { i18nContext } from "../../../utils/i18nContext";
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
      className={`bg-light-ultrawhite dark:bg-dark-light border border-light-light dark:border-dark-light hover:border-light-graybutton hover:bg-light-dark hover:dark:border-dark-graybutton hover:dark:bg-dark-radargrid w-full rounded-full p-4 bg-right outline-none focus-visible:outline-light-red dark:focus-visible:outline-dark-red ${styles.search}`}
    />
  );
};

export default SearchBar;