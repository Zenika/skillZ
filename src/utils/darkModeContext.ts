import { createContext } from "react";

type DarkModeContext = {
  darkMode: boolean;
  changeDarkMode: (darkMode: boolean) => void;
};

export const DarkModeContext = createContext<DarkModeContext>(undefined);
