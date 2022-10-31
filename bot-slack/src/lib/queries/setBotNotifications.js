const SET_BOT_NOTIFICATIONS = `
mutation setBotNotifications($email: String!, $botNotifications: Boolean!) {
    update_User(where: {email: {_eq: $email}}, _set: {botNotifications: $botNotifications}) {
      affected_rows
    }
  }`;

module.exports.SET_BOT_NOTIFICATIONS = SET_BOT_NOTIFICATIONS;
