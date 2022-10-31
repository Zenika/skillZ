const { request } = require("../utils/requestGraphQL");
const { GET_ALL_SKILLS_NAME } = require("../queries/getAllSkillsName");
async function getAllSkillsNames() {
  const response = await request(GET_ALL_SKILLS_NAME);
  return response.data;
}

module.exports.getAllSkillsNames = getAllSkillsNames;
