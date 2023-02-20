import gql from "graphql-tag";

export const GET_NOTIFICATIONS = gql`
  query getNotifications($userEmail: String!) {
    UserNotifications(where: { user_email: { _eq: $userEmail } }) {
      admin_email
      checked
      created_at
      skill {
        name
        Category {
          label
        }
      }
    }
  }
`;
