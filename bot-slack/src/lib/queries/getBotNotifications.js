GET_BOT_NOTIFICATIONS = `
query getBotNotifications($email: String!) {
    User(where: {email: {_eq: $email}}) {
      botNotifications
    }
  }
`;

module.exports.GET_BOT_NOTIFICATIONS = GET_BOT_NOTIFICATIONS;
