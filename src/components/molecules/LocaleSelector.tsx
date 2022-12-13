import { SlidingCheckbox } from "../atoms/SlidingCheckbox";

export const LocaleSelector = ({
  locale,
  changeLocale,
  t,
}: {
  locale: string;
  changeLocale: (locale: string) => void;
  t: (path: string) => string;
}) => {
  const values: [any, any] = ["en", "fr"];
  return (
    <div
      className="cursor"
      onClick={() => changeLocale(locale === values[0] ? values[1] : values[0])}
    >
      <span>{t("sidepanel.language")}</span>
      <ul className="flex flex-row justify-around">
        <li>🇬🇧</li>
        <li>
          <SlidingCheckbox selectedValue={locale} values={values} />
        </li>
        <li>🇫🇷</li>
      </ul>
    </div>
  );
};
