const { SET_BOT_NOTIFICATIONS } = require("../queries/setBotNotifications");
const { request } = require("../utils/requestGraphQL");

async function setBotNotifications(email, notifications) {
  const variables = {
    email: email,
    botNotifications: notifications,
  };
  const response = await request(SET_BOT_NOTIFICATIONS, variables);
  return response;
}

module.exports.setBotNotifications = setBotNotifications;
