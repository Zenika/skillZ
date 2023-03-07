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

export const UPDATE_NOTIFICATION_CHECK = gql`
  mutation updateNotificationCheck($id: uuid) {
    update_UserNotifications(
      where: { id: { _eq: $id } }
      _set: { checked: true }
    ) {
      affected_rows
    }
  }
`;
