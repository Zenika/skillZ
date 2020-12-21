import React, { useEffect, useState } from "react";
import { of } from "await-of";
import { useDebounce } from "../../utils/useDebounce";
import "./AutoCompleteInputField.css";

type AutoCompleteItem = {
  id: string;
  name: string;
};

const AutoCompleteInputField = <T extends AutoCompleteItem>({
  searchFunction,
  onSelect,
  onSelectClearInput
}: {
  searchFunction: (searchInput: string) => Promise<T[]>;
  onSelect: (selected: T) => void;
  onSelectClearInput: boolean;
}) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<T[]>([]);

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    (async () => {
      if (!debouncedValue || debouncedValue === "") {
        setResults([]);
        return;
      }
      const [searchResults, err] = await of(searchFunction(debouncedValue));
      if (err) {
        console.error(err);
        return;
      }
      if (typeof searchResults !== "object" || !Array.isArray(searchResults)) {
        return;
      }
      setResults(searchResults);
    })();
  }, [debouncedValue]);

  const onInputChange = (event: any) => setValue(event.target.value ?? "");

  const onSelectItem = (selectedValue: T) => {
    onSelect(selectedValue);
    if (onSelectClearInput) {
      setValue("");
    }
  };

  return (
    <div className="autocomplete">
      <input
        className="autocomplete-input"
        type="text"
        value={value}
        onChange={(e) => onInputChange(e)}
      />
      <ul className="autocomplete-results">
        {results.map((result) => (
          <li
            className="autocomplete-item"
            key={result.id}
            onClick={() => onSelectItem(result)}
          >
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoCompleteInputField;
