import { gql } from '@apollo/client'

export const INSERT_USER_ROLE_MUTATION = gql`
    mutation insertUserRoleMutation($email: String!, $roleId: uuid!) {
        insert_UserRole_one(object: { userEmail: $email, roleId: $roleId }) {
            roleId
        }
    }
`

export const DELETE_USER_ROLE_MUTATION = gql`
    mutation deleteUserRoleMutation($email: String!, $roleId: uuid!) {
        delete_UserRole(
            where: { roleId: { _eq: $roleId }, userEmail: { _eq: $email } }
        ) {
            affected_rows
        }
    }
`

export const INSERT_USER_MUTATION = gql`
    mutation insertUserMutation(
        $email: String!
        $name: String!
        $picture: String!
    ) {
        insert_User(
            objects: { email: $email, name: $name, picture: $picture }
            on_conflict: {
                constraint: User_pkey
                update_columns: [name, picture]
            }
        ) {
            affected_rows
        }
    }
`

export const UPSERT_USER_AGENCY_MUTATION = gql`
    mutation insertUserAgencyMutation($email: String!, $agency: String!) {
        insert_UserAgency_one(
            object: { userEmail: $email, agency: $agency }
            on_conflict: {
                constraint: UserAgency_pkey
                update_columns: [agency, created_at]
            }
        ) {
            agency
        }
    }
`

export const UPSERT_USER_CERTIFICATION_MUTATION = gql`
    mutation insertUserCertificationMutation(
        $email: String!
        $certId: Int!
        $obtained: Boolean!
        $from: date!
        $to: date
        $url: String
    ) {
        insert_UserCertification_one(
            object: {
                certId: $certId
                from: $from
                obtained: $obtained
                to: $to
                url: $url
                userEmail: $email
            }
            on_conflict: {
                constraint: UserCertification_pkey
                update_columns: [obtained, from, to, url]
            }
        ) {
            userEmail
            certId
            obtained
            from
            to
            url
        }
    }
`

export const DELETE_USER_CERTIFICATION_MUTATION = gql`
    mutation deleteUserCertificationMutation(
        $email: String!
        $certId: Int!
        $from: date!
    ) {
        delete_UserCertification(
            where: {
                userEmail: { _eq: $email }
                certId: { _eq: $certId }
                from: { _eq: $from }
            }
        ) {
            affected_rows
        }
    }
`

export const INSERT_USER_TOPIC_MUTATION = gql`
    mutation insertUserTopicMutation($email: String!, $topicId: uuid!) {
        insert_UserTopic_one(object: { userEmail: $email, topicId: $topicId }) {
            topicId
        }
    }
`

export const DELETE_USER_TOPIC_MUTATION = gql`
    mutation deleteUserTopicMutation($email: String!, $topicId: uuid!) {
        delete_UserTopic(
            where: { topicId: { _eq: $topicId }, userEmail: { _eq: $email } }
        ) {
            affected_rows
        }
    }
`

export const DELETE_USER_SKILL_MUTATION = gql`
    mutation deleteSkillLevelsByUser($email: String!, $skillId: uuid!) {
        delete_UserSkillDesire(
            where: { userEmail: { _eq: $email }, skillId: { _eq: $skillId } }
        ) {
            affected_rows
        }
    }
`

export const UPDATE_USER_ACTIVITY = gql`
    mutation updateUserActivity(
        $email: String = ""
        $last_login: timestamptz = ""
        $current_login: timestamptz = ""
    ) {
        update_User(
            where: { email: { _eq: $email } }
            _set: { last_login: $last_login, current_login: $current_login }
        ) {
            affected_rows
        }
    }
`
