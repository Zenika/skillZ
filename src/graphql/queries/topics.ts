import { gql } from '@apollo/client';

export const GET_TOPICS_INFOS = gql`
    query getTopicsInfos {
        Topic {
            name
            id
            type
        }
    }
`;
