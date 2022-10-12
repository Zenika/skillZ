const {
  GET_SKILL_CATEGORY_AND_ID_BY_NAME,
} = require("../queries/getSkillCategoryAndIDByName");
const { request } = require("../utils/requestGraphQL");

async function getSkillCategoryAndIDByName(name) {
  const variables = {
    name: name,
  };
  try {
    const response = await request(
      GET_SKILL_CATEGORY_AND_ID_BY_NAME,
      variables
    );
    return response.data.Skill[0];
  } catch (e) {
    console.error(e);
  }
}

module.exports.getSkillCategoryAndIDByName = getSkillCategoryAndIDByName;
