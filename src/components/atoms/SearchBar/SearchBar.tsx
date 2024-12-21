import styles from './SearchBar.module.css';

export const searchBarClasses = {
    base: 'bg-light-ultrawhite border border-light-light w-full rounded-full p-4 bg-right outline-none',
    dark: 'dark:bg-dark-light dark:border-dark-light',
    hover: 'hover:border-light-graybutton hover:bg-light-dark hover:dark:border-dark-graybutton hover:dark:bg-dark-radargrid',
    focus: 'focus-visible:outline-light-red dark:focus-visible:outline-dark-red',
};

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
    return (
        <input
            type="text"
            value={value ?? initialValue}
            placeholder={placeholder}
            onChange={(e) => setSearch(e?.target?.value || '')}
            className={`${searchBarClasses.base} ${searchBarClasses.dark} ${searchBarClasses.hover} ${searchBarClasses.focus} ${styles.search}`}
        />
    );
};

export default SearchBar;
