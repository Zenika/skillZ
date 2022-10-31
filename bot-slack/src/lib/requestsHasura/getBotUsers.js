const { GET_BOT_USERS } = require("../queries/getBotUsers");
const { request } = require("../utils/requestGraphQL");

async function getBotUsers() {
  const response = await request(GET_BOT_USERS);
  return response.data.User;
}

module.exports.getBotUsers = getBotUsers;
