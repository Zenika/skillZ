const { GET_LAST_UPDATED_SKILLS } = require("../queries/getSkillsDatesUpdates");
const { request } = require("../utils/requestGraphQL");

async function getSkillsDatesUpdates(email) {
  const variables = {
    email: email,
  };
  const response = await request(GET_LAST_UPDATED_SKILLS, variables);
  return response.data.UsersCurrentSkillsAndDesires;
}
module.exports.getSkillsDatesUpdates = getSkillsDatesUpdates;
