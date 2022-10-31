const { request } = require("../utils/requestGraphQL");
const { GET_ALL_EMAILS } = require("../queries/getAllEmails");

async function getAllEmails() {
  const response = await request(GET_ALL_EMAILS);
  return response.data;
}

module.exports.getAllEmails = getAllEmails;
