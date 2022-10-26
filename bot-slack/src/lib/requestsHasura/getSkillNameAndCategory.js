const {
  GET_SKILL_NAME_AND_CATEGORY_BY_ID,
} = require("../queries/getSkillNameAndCategory");
const { request } = require("../utils/requestGraphQL");

async function getSkillNameAndCategory(id) {
  const variables = {
    skill: id,
  };
  try {
    const response = await request(
      GET_SKILL_NAME_AND_CATEGORY_BY_ID,
      variables
    );
    return response.data.Skill_by_pk;
  } catch (e) {
    console.error("error : ", e);
  }
}

module.exports.getSkillNameAndCategory = getSkillNameAndCategory;
