import React, { type JSX } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

export type ChipType = 'primary' | 'secondary' | 'tertiary'

type ChipProps = {
    type: ChipType
    callback?: () => void
    children?: JSX.Element | JSX.Element[] | string | string[]
}

export const chipTypeClasses: Record<ChipType, string> = {
    primary: 'gradient-red text-light-dark',
    secondary:
        'bg-transparent border border-dark-red dark:border-dark-red text-dark-red',
    tertiary: 'bg-light-graybutton dark:bg-dark-graybutton',
}

export const chipClasses = {
    base: 'text-base px-4 py-1 my-1 rounded-full flex',
    uppercase: 'uppercase',
    variant: chipTypeClasses,
    children:
        'flex-row flex-wrap flex justify-center align-middle items-center gap-2',
    button: 'flex justify-center items-center pl-4',
}

const Chip = ({ type, callback, children }: ChipProps) => {
    return (
        <div
            className={`${chipClasses.base} ${chipClasses.uppercase} ${chipClasses.variant[type]}`}
        >
            <div className={`${chipClasses.children}`}>{children}</div>
            <button className={`${chipClasses.button}`} onClick={callback}>
                <IoIosCloseCircle size={20} />
            </button>
        </div>
    )
}

export default Chip
