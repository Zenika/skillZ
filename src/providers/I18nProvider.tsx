import { createContext, useContext } from 'react'

type I18nContextType = {
    t: (path: string) => string
    changeLocale: (locale: string) => void
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined)

export const I18nProvider = ({
    children,
    value: { t, changeLocale },
}: { children: any } & { value: I18nContextType }) => (
    <I18nContext.Provider value={{ t, changeLocale }}>
        {children}
    </I18nContext.Provider>
)

export const useI18n = (): I18nContextType => {
    const context = useContext<I18nContextType | undefined>(I18nContext)
    if (!context) {
        throw new Error('useI18n must be used within a i18nProvider')
    }
    return context
}
