import gql from 'graphql-tag'

export const UPDATE_CATEGORY_BY_PK = gql`
    mutation updateCategoryByPk($id: uuid = "", $description: String = "") {
        update_Category_by_pk(
            pk_columns: { id: $id }
            _set: { description: $description }
        ) {
            id
        }
    }
`
