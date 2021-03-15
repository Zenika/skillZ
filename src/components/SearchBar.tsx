import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search for a skill"
      onChange={(e) => setSearch(e?.target?.value || "")}
      className={`dark:bg-dark-light w-full rounded-full p-4 bg-search ${styles.search}`}
    />
  );
};

export default SearchBar;
