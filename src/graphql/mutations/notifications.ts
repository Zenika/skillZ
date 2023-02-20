import gql from "graphql-tag";

export const INSERT_NOTIFICATION = gql`
  mutation insertNotification(
    $userEmail: String!
    $skillId: uuid!
    $adminEmail: String!
    $checked: Boolean!
  ) {
    insert_UserNotifications(
      objects: {
        user_email: $userEmail
        skill_id: $skillId
        admin_email: $adminEmail
        checked: $checked
      }
    ) {
      affected_rows
    }
  }
`;
