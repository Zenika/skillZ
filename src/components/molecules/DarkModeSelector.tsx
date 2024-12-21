import { SlidingCheckbox } from '../atoms/SlidingCheckbox'

export const DarkModeSelector = ({
    darkMode,
    changeDarkMode,
    t,
}: {
    darkMode: boolean
    changeDarkMode: (darkMode: boolean) => void
    t: (path: string) => string
}) => {
    const values: [any, any] = [false, true]
    return (
        <div
            className="cursor"
            onClick={() =>
                changeDarkMode(darkMode === values[0] ? values[1] : values[0])
            }
        >
            <span>{t('sidepanel.darkMode')}</span>
            <ul className="flex flex-row justify-around">
                <li>☀️</li>
                <li>
                    <SlidingCheckbox selectedValue={darkMode} values={values} />
                </li>
                <li>🌑</li>
            </ul>
        </div>
    )
}
