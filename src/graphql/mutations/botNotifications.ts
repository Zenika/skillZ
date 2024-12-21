import gql from 'graphql-tag'

export const SET_BOT_NOTIFICATIONS = gql`
    mutation setBotNotifications($email: String!, $botNotifications: Boolean!) {
        update_User(
            where: { email: { _eq: $email } }
            _set: { botNotifications: $botNotifications }
        ) {
            affected_rows
        }
    }
`

export const GET_BOT_NOTIFICATIONS_QUERY = gql`
    query getBotNotifications($email: String!) {
        User(where: { email: { _eq: $email } }) {
            botNotifications
            email
        }
    }
`
