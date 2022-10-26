GET_BOT_USERS = `
query getBotUsers {
    User(where: {botNotifications: {_eq: true}}) {
      email
    }
  }  
`;

module.exports.GET_BOT_USERS = GET_BOT_USERS;
