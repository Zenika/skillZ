import { createContext } from "react";

type i18nContext = {
  t: (path: string) => string;
  changeLocale: (locale: string) => void;
};

export const i18nContext = createContext<i18nContext>(undefined);
