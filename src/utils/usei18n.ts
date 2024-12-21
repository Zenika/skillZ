import objectPath from 'object-path';

import en from '../../i18n/en';
import fr from '../../i18n/fr';

const locales = {
    en,
    fr,
};

export const usei18n = (locale: string) => (path: string) =>
    objectPath.get(locales[locale], path);
