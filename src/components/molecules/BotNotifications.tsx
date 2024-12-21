import { useMutation, useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { GetBotNotificationsQuery } from '../../generated/graphql'
import {
    GET_BOT_NOTIFICATIONS_QUERY,
    SET_BOT_NOTIFICATIONS,
} from '../../graphql/mutations/botNotifications'
import { SlidingCheckbox } from '../atoms/SlidingCheckbox'
import Loading from './Loading'

export const BotNotifications = ({ t }: { t: (path: string) => string }) => {
    const values: [any, any] = [false, true]
    const { user } = useAuth0()
    const {
        data: userDatas,
        loading,
        error: errorUserDatas,
        refetch,
    } = useQuery<GetBotNotificationsQuery>(GET_BOT_NOTIFICATIONS_QUERY, {
        variables: { email: user.email },
        fetchPolicy: 'network-only',
    })
    const [setBotNotification] = useMutation(SET_BOT_NOTIFICATIONS)

    function changeBotNotification() {
        if (
            userDatas?.User.length > 0 &&
            userDatas?.User[0].botNotifications === values[0]
        ) {
            setBotNotification({
                variables: {
                    email: user.email,
                    botNotifications: values[1],
                },
            })
        } else {
            setBotNotification({
                variables: {
                    email: user.email,
                    botNotifications: values[0],
                },
            })
        }
        refetch()
    }
    return (
        <div>
            {userDatas && !errorUserDatas && !loading ? (
                <div className="cursor" onClick={() => changeBotNotification()}>
                    <span>{t('sidepanel.botNotifications')}</span>
                    <ul className="flex flex-row justify-around">
                        <li>🔇</li>
                        <li>
                            {userDatas?.User[0] && (
                                <SlidingCheckbox
                                    selectedValue={
                                        userDatas?.User[0].botNotifications
                                    }
                                    values={values}
                                />
                            )}
                        </li>
                        <li>🔔</li>
                    </ul>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    )
}
