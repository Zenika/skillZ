const { GET_SKILL_ID_BY_NAME } = require("../queries/getSkillIDByName");
const { request } = require("../utils/requestGraphQL");

async function getSkillIDByName(name) {
  const variables = {
    name: name,
  };
  try {
    const response = await request(GET_SKILL_ID_BY_NAME, variables);
    return response.data.Skill[0];
  } catch (e) {
    console.error(e);
  }
}

module.exports.getSkillIDByName = getSkillIDByName;
