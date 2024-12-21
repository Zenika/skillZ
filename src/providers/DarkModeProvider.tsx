import { createContext, useContext } from 'react'

type DarkModeContextType = {
    darkMode: boolean
    changeDarkMode: (darkMode: boolean) => void
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
    undefined
)

export const DarkModeProvider = ({
    children,
    value: { darkMode, changeDarkMode },
}: {
    children: any
    value: {
        darkMode: boolean
        changeDarkMode: (darkMode: boolean) => void
    }
}) => (
    <DarkModeContext.Provider value={{ darkMode, changeDarkMode }}>
        {children}
    </DarkModeContext.Provider>
)

export const useDarkMode = (): DarkModeContextType => {
    const context = useContext<DarkModeContextType | undefined>(DarkModeContext)
    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider')
    }
    return context
}
