const { GETLASTUPDATES } = require("../queries/getLastUpdateOnSkill");
const { request } = require("../utils/requestGraphQL");

async function getLastUpdateOnSkill(email) {
  const variables = {
    email: email,
  };
  const response = await request(GETLASTUPDATES, variables);
  return response.data.UserSkillDesire;
}

module.exports.getLastUpdateOnSkill = getLastUpdateOnSkill;
