const { GET_BOT_NOTIFICATIONS } = require("../queries/getBotNotifications");
const { request } = require("../utils/requestGraphQL");

async function getBotNotifications(email) {
  const variables = {
    email: email,
  };
  const response = await request(GET_BOT_NOTIFICATIONS, variables);
  return response.data;
}

module.exports.getBotNotifications = getBotNotifications;
