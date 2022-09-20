import { gql } from "@apollo/client";

export const GET_CATEGORIE_ID_BY_NAME = gql`
  query getCategoryIDByName($name: String!) {
    Category(where: { label: { _eq: $name } }) {
      id
    }
  }
`;