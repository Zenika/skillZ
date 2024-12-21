import React from 'react'
import { BadgeSubojectivesCategoryCompletion } from './Badge'
import { useI18n } from '../../providers/I18nProvider'

type StatisticsProps = {
    userAchievements: any
    skillsDatas: any
    readOnly: boolean
}

export const Statistics = ({
    userAchievements,
    skillsDatas,
    readOnly,
}: StatisticsProps) => {
    const { t } = useI18n()

    const filterCountSkills = (label) =>
        skillsDatas.find((c) => c.label === label)
            .CurrentSkillsAndDesires_aggregate.aggregate.count

    return (
        <div className="bg-light-dark dark:bg-dark-dark pb-4 pl-4 pr-4 my-2 p-2 flex-col rounded-lg">
            <h2 className="p-2 text-xl">
                {readOnly
                    ? t('statistics.titleSection')
                    : t('statistics.myTitleSection')}
            </h2>
            <BadgeSubojectivesCategoryCompletion
                label={'practices'}
                datas={userAchievements}
                src="/img/badges/hexagone.svg"
                countSkills={filterCountSkills('practices')}
                readOnly={readOnly}
            />
            <BadgeSubojectivesCategoryCompletion
                label={'activities'}
                datas={userAchievements}
                src="/img/badges/hexagone.svg"
                countSkills={filterCountSkills('activities')}
                readOnly={readOnly}
            />
            <BadgeSubojectivesCategoryCompletion
                label={'knowledge'}
                datas={userAchievements}
                src="/img/badges/hexagone.svg"
                countSkills={filterCountSkills('knowledge')}
                readOnly={readOnly}
            />
            <BadgeSubojectivesCategoryCompletion
                label={'behaviors'}
                datas={userAchievements}
                src="/img/badges/hexagone.svg"
                countSkills={filterCountSkills('behaviors')}
                readOnly={readOnly}
            />
        </div>
    )
}
