import { useQuery } from '@apollo/client'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import TopBar from '../components/atoms/TutorialMode/TutorialTopBar'
import Loading from '../components/molecules/Loading'
import HomePanel from '../components/organisms/HomePanel/HomePanel'
import CommonPage from '../components/templates/CommonPage'
import ErrorPage from '../components/templates/ErrorPage'
import { config } from '../env'
import {
    GetCurrentUserSkillsAndDesiresQuery,
    GetUserQuery,
} from '../generated/graphql'
import {
    GET_USER_CURRRENT_SKILLS_AND_DESIRES_QUERY,
    GET_USER_QUERY,
} from '../graphql/queries/userInfos'

const Home = () => {
    /*
     * HOOKS
     */
    const { push, replace } = useRouter()

    const { user, isLoading: authLoading, error: authError } = useAuth0()
    const link = new URL(`${config.nextPublicBaseUrl}/profile`)

    useEffect(() => {
        if (!window.history.state.url) {
            replace('/')
        }
    }, [replace])

    /*
     * QUERIES
     */
    const {
        data: userData,
        loading: userLoading,
        error: userError,
    } = useQuery<GetUserQuery>(GET_USER_QUERY, {
        variables: { email: user.email },
        fetchPolicy: 'network-only',
    })

    const {
        data: skillsData,
        error: dataError,
        loading: dataLoading,
    } = useQuery<GetCurrentUserSkillsAndDesiresQuery>(
        GET_USER_CURRRENT_SKILLS_AND_DESIRES_QUERY,
        {
            variables: { email: user.email },
            fetchPolicy: 'network-only',
        }
    )

    if (userData?.User.length <= 0) {
        push(link)
    }

    const homePanelData = skillsData?.Category.map((data) => ({
        x: data.x,
        y: data.y,
        color: data.color,
        name: data.label,
        description: data.description,
        count: data.CurrentSkillsAndDesires_aggregate.aggregate.count,
        context: 'mine',
        data: data.CurrentSkillsAndDesires.map((skill) => ({
            id: skill.skillId,
            name: skill.name,
            skillLevel: skill.skillLevel,
            desireLevel: skill.desireLevel,
        })),
        certifs: 0,
    }))

    if (authLoading || userLoading || dataLoading) {
        return <Loading />
    } else if (authError || userError || dataError) {
        return <ErrorPage />
    }
    return (
        <CommonPage page={'Home'} backBar={false}>
            <TopBar />
            <div className="flex flex-row mx-4 flex-wrap mb-20">
                {homePanelData &&
                    homePanelData.map((computedDataSkill) => (
                        <HomePanel
                            props={computedDataSkill}
                            key={`home-panel-${computedDataSkill.name}`}
                        />
                    ))}
            </div>
        </CommonPage>
    )
}

export default withAuthenticationRequired(Home)
