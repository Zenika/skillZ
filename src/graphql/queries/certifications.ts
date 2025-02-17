import { gql } from '@apollo/client'

export const GET_USER_CERTIFICATION = gql`
    query getUserCertification($name: String!) {
        UserCertification(
            where: {
                Certification: { name: { _eq: $name } }
                User: { active: { _eq: true } }
            }
        ) {
            userEmail
            certId
            from
            obtained
            to
            url
            User {
                picture
                name
                email
                UserLatestAgency {
                    agency
                }
            }
        }
    }
`
