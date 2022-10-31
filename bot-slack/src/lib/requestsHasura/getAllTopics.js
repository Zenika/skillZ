const { request } = require("../utils/requestGraphQL");
const { GET_ALL_TOPICS } = require("../queries/getAllTopics");

async function getAllTopics() {
  try {
    const response = await request(GET_ALL_TOPICS);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

module.exports.getAllTopics = getAllTopics;
