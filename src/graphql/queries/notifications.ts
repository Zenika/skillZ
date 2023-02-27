import gql from "graphql-tag";

export const GET_NOTIFICATIONS = gql`
  query getNotifications($userEmail: String!) {
    UserNotifications(
      where: { user_email: { _eq: $userEmail } }
      order_by: { created_at: desc }
    ) {
      admin_email
      id
      checked
      created_at
      skill {
        name
        Category {
          id
          label
        }
      }
    }
  }
`;

export const GET_UNREAD_NOTIFICATIONS = gql`
  query getUnreadNotifications($userEmail: String!) {
    UserNotifications(
      where: { user_email: { _eq: $userEmail }, checked: { _eq: false } }
    ) {
      id
    }
  }
`;
