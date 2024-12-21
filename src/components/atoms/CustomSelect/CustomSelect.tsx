import { useEffect, useState } from 'react';
import { useDarkMode } from '../../../providers/DarkModeProvider';
import styles from './CustomSelect.module.css';

type CustomSelectProps = {
    choices: any[];
    keyFn: (x: any) => string;
    labelFn: (x: any) => string;
    selectedChoice?: any;
    placeholder: string;
    readOnly?: boolean;
    onChange: (choice: any) => void;
};

export const customSelectClasses = {
    base: 'w-auto z-10 h-12',
    placeholder: {
        parent: {
            base: 'bg-light-light w-full p-3 appearance-none rounded-lg border border-solid border-light-dark max-h-16 text-ellipsis overflow-hidden',
            dark: 'dark:bg-dark-light dark:border-dark-light dark:border-dark-graybutton',
            hover: 'hover:bg-light-dark hover:border-light-graybutton hover:dark:bg-dark-radargrid',
            readonly: 'cursor-pointer bg-rightDropdown',
        },
    },
    dropdown: {
        base: 'flex flex-row justify-center w-full duration-500',
        opened: 'h-0',
        children: {
            parent: {
                base: 'flex w-full flex-col z-10 bg-light-light overflow-y-scroll max-h-96 mt-1 rounded-lg border border-solid border-light-dark',
                dark: 'dark:bg-dark-light dark:border-dark-graybutton',
            },
            child: {
                base: 'py-2 px-4 cursor-pointer',
                hover: 'hover:bg-light-dark hover:dark:bg-dark-radargrid',
            },
        },
    },
};

const CustomSelect = ({
    keyFn,
    labelFn,
    choices,
    selectedChoice,
    placeholder,
    readOnly = false,
    onChange,
}: CustomSelectProps) => {
    const [opened, setOpened] = useState(false);
    const { darkMode } = useDarkMode();
    const [selected, setSelected] = useState(undefined);

    useEffect(() => {
        setSelected(selectedChoice);
    }, [selectedChoice]);

    const onItemClick = (value: string) => {
        setSelected(value);
        onChange(value);
        setOpened(false);
    };

    return (
        <div className={`${customSelectClasses.base}`}>
            <div
                className={`${customSelectClasses.placeholder.parent.base} ${
                    customSelectClasses.placeholder.parent.dark
                } ${customSelectClasses.placeholder.parent.hover} ${
                    !readOnly && customSelectClasses.placeholder.parent.readonly
                } ${readOnly ? '' : darkMode ? styles.selectDark : styles.selectLight}`}
                onClick={() => setOpened(!opened)}
            >
                <span>
                    {selected !== undefined ? labelFn(selected) : placeholder}
                </span>
            </div>
            <div
                className={`${customSelectClasses.dropdown.base} ${
                    !opened && customSelectClasses.dropdown.opened
                }`}
            >
                {!readOnly && opened && (
                    <div
                        className={`${customSelectClasses.dropdown.children.parent.base} ${customSelectClasses.dropdown.children.parent.dark}`}
                    >
                        {choices.map((choice) => (
                            <span
                                key={keyFn(choice)}
                                className={`${customSelectClasses.dropdown.children.child.base} ${customSelectClasses.dropdown.children.child.hover}`}
                                onClick={() => onItemClick(choice)}
                            >
                                {labelFn(choice)}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;
