const {
  GET_SKILLS_INFOS_DESIRE_AND_SKILL_BY_ID,
} = require("../queries/getSkillsInfosDesireAndSkillByID");
const { request } = require("../utils/requestGraphQL");

async function getSkillsInfosDesireAndSkillByID(email, id) {
  const variables = {
    email: email,
    id: id,
  };
  const response = await request(
    GET_SKILLS_INFOS_DESIRE_AND_SKILL_BY_ID,
    variables
  );
  return response.data;
}

module.exports.getSkillsInfosDesireAndSkillByID =
  getSkillsInfosDesireAndSkillByID;
