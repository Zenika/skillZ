import { createContext, useContext } from 'react'

type TutorialModeContextType = {
    tutorialMode: boolean
    changeTutorialMode: (tutorialMode: boolean) => void
}

export const TutorialModeContext = createContext<
    TutorialModeContextType | undefined
>(undefined)

export const TutorialModeProvider = ({
    children,
    value: { tutorialMode, changeTutorialMode },
}: {
    children: any
    value: {
        tutorialMode: boolean
        changeTutorialMode: (tutorialMode: boolean) => void
    }
}) => (
    <TutorialModeContext.Provider value={{ tutorialMode, changeTutorialMode }}>
        {children}
    </TutorialModeContext.Provider>
)

export const useTutorialMode = (): TutorialModeContextType => {
    const context = useContext<TutorialModeContextType | undefined>(
        TutorialModeContext
    )
    if (!context)
        throw new Error(
            'useTutorialMode must be used within a TutorialModeProvider'
        )
    return context
}
