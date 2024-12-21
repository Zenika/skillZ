import gql from 'graphql-tag'

export const INSERT_NEW_TAG = gql`
    mutation insertNewTag($tagName: String!, $creatorEmail: String!) {
        insert_Tag(
            on_conflict: { constraint: Tag_name_key }
            objects: { name: $tagName, creator: $creatorEmail }
        ) {
            affected_rows
        }
    }
`
