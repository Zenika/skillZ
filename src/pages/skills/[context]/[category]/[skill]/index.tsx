import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import UserSkillPanel from '../../../../../components/molecules/UserSkillPanel'
import CommonPage from '../../../../../components/templates/CommonPage'
import { displayNotification } from '../../../../../utils/displayNotification'
import { useFetchUsersForSkill } from '../../../../../utils/fetchers/useFetchUsersForSkill'

const SkillPage = () => {
    const router = useRouter()
    let { context, category, skill, agency } = router.query

    const isDesktop = useMediaQuery({
        query: '(min-device-width: 1280px)',
    })

    agency = agency
        ? typeof agency === 'string'
            ? agency
            : agency.join('')
        : undefined
    skill = skill
        ? typeof skill === 'string'
            ? skill
            : skill.join('')
        : undefined
    context = context
        ? typeof context === 'string'
            ? context
            : context.join('')
        : undefined
    category = category
        ? typeof category === 'string'
            ? category
            : category.join('')
        : undefined
    const { data, error } = useFetchUsersForSkill(category, skill, agency)
    if (error) {
        displayNotification(`Error: ${error.message}`, 'red', 5000)
    }
    return (
        <CommonPage page={skill}>
            <div className="flex flex-row justify-center mt-4 mb-20">
                <div className="flex flex-row justify-center max-w-screen-xl w-full p-4">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-center w-full">
                            <div
                                className={`flex flex-col ${
                                    isDesktop ? 'w-1/3' : 'w-full'
                                } px-2`}
                            >
                                <div className="flex flex-col mt-6 max-w-screen-xl min-h-screen">
                                    {data?.map((data) => (
                                        <UserSkillPanel
                                            skill={data}
                                            context={context as string}
                                            key={`key-${data.name}-${data.user}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommonPage>
    )
}

export default withAuthenticationRequired(SkillPage)
