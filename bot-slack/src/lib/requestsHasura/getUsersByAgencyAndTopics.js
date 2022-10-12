const {
  GET_USERS_BY_AGENCY_AND_TOPICS,
} = require("../queries/getUsersByAgencyAndTopics");
const { request } = require("../utils/requestGraphQL");

async function getUsersByAgencyAndTopics(agency, topic) {
  const variables = {
    agency: agency,
    topic: topic,
  };
  const response = await request(GET_USERS_BY_AGENCY_AND_TOPICS, variables);
  return response.data;
}

module.exports.getUsersByAgencyAndTopics = getUsersByAgencyAndTopics;
