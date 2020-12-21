import { useEffect, useState } from "react";

export const useDebounce = (value: any, timeOffsetMillis: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (!value || value === "") {
      setDebouncedValue("");
    }
    const handler = setTimeout(
      () => setDebouncedValue(value),
      timeOffsetMillis
    );
    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};
