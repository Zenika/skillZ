import Image from 'next/image'
import { useState } from 'react'
import { useDarkMode } from '../../providers/DarkModeProvider'
import { FetchedSkill } from '../../utils/types'
import Button from '../atoms/Button'
import { useI18n } from '../../providers/I18nProvider'

type AddOrEditSkillProps = {
    skill?: FetchedSkill
    callback: (skill: FetchedSkill) => void
    add?: string | string[]
}

const AddOrEditSkill = ({ skill, callback, add }: AddOrEditSkillProps) => {
    const { t } = useI18n()
    const { darkMode } = useDarkMode()
    const [navState, setNavState] = useState('knowledge')
    const [skillLevel, setSkillLevel] = useState(skill?.skillLevel || 0)
    const [desireLevel, setDesireLevel] = useState(skill?.desireLevel || 0)

    const onAddButtonClick = () => {
        callback({ ...skill, skillLevel, desireLevel, add: true })
    }

    const onDeleteButtonClick = () => {
        callback({ ...skill, add: false })
    }

    return (
        <div
            id="addOrEditSkill"
            className="flex flex-col relative h-fit max-h-75vh w-full"
        >
            <h1 className="m-auto px-2 my-4 text-xl text-bold">
                {skill?.name}
            </h1>
            <div className="flex flex-col">
                <div className="flex flex-row justify-around">
                    <div className="flex flex-col">
                        {/* TOTO: Custom Component for navigation tab*/}
                        <button
                            className="p-2"
                            onClick={() => setNavState('knowledge')}
                        >
                            {t('skills.modal.knowledge')}
                        </button>
                        <span
                            className={`h-1 rounded-full ${
                                navState === 'knowledge' ? 'gradient-red' : ''
                            }`}
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* TOTO: Custom Component for navigation tab*/}
                        <button
                            className="p-2"
                            onClick={() => setNavState('desire')}
                        >
                            {t('skills.modal.desire')}
                        </button>
                        <span
                            className={`h-1 rounded-full ${
                                navState === 'desire' ? 'gradient-red' : ''
                            }`}
                        />
                    </div>
                </div>
                <div className="m-4">
                    <div
                        className={`flex flex-col ${
                            navState === 'knowledge' ? null : 'hidden'
                        }`}
                    >
                        {[1, 2, 3, 4, 5].map((index) => (
                            <button
                                key={`skill-${index}`}
                                onClick={() => {
                                    setSkillLevel(index)
                                    setNavState('desire')
                                }}
                                className={`flex flex-row text-left my-2 hover:brightness-150 ${
                                    skillLevel === index
                                        ? 'dark:hover:brightness-150'
                                        : 'dark:hover:brightness-75'
                                }`}
                            >
                                <span className="shrink-0 my-0.5">
                                    <Image
                                        src={`/icons/${darkMode ? 'dark' : 'light'}/${
                                            skillLevel === index
                                                ? 'full'
                                                : 'empty'
                                        }-select.svg`}
                                        alt={'level'}
                                        height={32}
                                        width={32}
                                        layout="fixed"
                                    />
                                </span>
                                <span className="ml-2 mt-1 text-base">{`${index} : ${t(
                                    `skillLevels.${index}`
                                )}`}</span>
                            </button>
                        ))}
                    </div>
                    <div
                        className={`flex flex-col ${
                            navState === 'desire' ? null : 'hidden'
                        }`}
                    >
                        {[1, 2, 3, 4, 5].map((index) => (
                            <button
                                key={`desire-${index}`}
                                onClick={() => setDesireLevel(index)}
                                className={`flex flex-row text-left my-2 hover:brightness-150 ${
                                    desireLevel === index
                                        ? 'dark:hover:brightness-150'
                                        : 'dark:hover:brightness-75'
                                }`}
                            >
                                <span className="shrink-0 my-0.5">
                                    <Image
                                        src={`/icons/${darkMode ? 'dark' : 'light'}/${
                                            desireLevel === index
                                                ? 'full'
                                                : 'empty'
                                        }-select.svg`}
                                        alt={'level'}
                                        height={32}
                                        width={32}
                                        layout="fixed"
                                    />
                                </span>

                                <span className="pl-2 pt-1 text-base">{`${index} : ${t(
                                    `desireLevels.${index}`
                                )}`}</span>
                            </button>
                        ))}
                    </div>
                    {skill.created_at && (
                        <p className="mb-3 text-xs text-light-graytext dark:text-dark-graytext">
                            {`${t('skills.lastUpdate')} : ${skill.created_at.toLocaleString(
                                [],
                                { dateStyle: 'short' }
                            )}`}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-row justify-between flex-wrap gap-4 pb-2">
                <div className="flex flex-row gap-4 flex-wrap justify-between w-full">
                    {!add ? (
                        <Button
                            type={'secondary'}
                            callback={onDeleteButtonClick}
                            disabled={
                                skillLevel === 0 ||
                                desireLevel === 0 ||
                                !skill.desireLevel ||
                                !skill.skillLevel
                            }
                        >
                            {t('skills.modal.delete')}
                        </Button>
                    ) : null}
                    <Button
                        type={'primary'}
                        callback={onAddButtonClick}
                        disabled={skillLevel === 0 || desireLevel === 0}
                    >
                        {t('skills.modal.addSkill')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddOrEditSkill
