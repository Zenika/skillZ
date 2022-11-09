import { SlidingCheckbox } from "./SlidingCheckbox";

export const LocaleSelector = ({
  locale,
  changeLocale,
  t,
}: {
  locale: string;
  changeLocale: (locale: string) => void; // eslint-disable-line no-unused-vars
  t: (path: string) => string; // eslint-disable-line no-unused-vars
}) => {
  const values: [any, any] = ["en", "fr"];
  return (
    <div
      className="cursor"
      onClick={() => changeLocale(locale === values[0] ? values[1] : values[0])}
    >
      <span>{t("sidepanel.preferedLanguage")}</span>
      <ul className="flex flex-row justify-around">
        <li>🇬🇧</li>
        <li>
          <SlidingCheckbox
            selectedValue={locale}
            values={values}
            alwaysFull={true}
          />
        </li>
        <li>🇫🇷</li>
      </ul>
    </div>
  );
};
