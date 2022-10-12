const {
  SET_SKILLS_DESIRE_SKILL_LEVEL,
} = require("../queries/setSkillsDesireSkillLevel");
const { request } = require("../utils/requestGraphQL");

async function setSkillsDesireSkillLevel(
  userEmail,
  skillID,
  skillValue,
  desireValue
) {
  const variables = {
    email: userEmail,
    skillId: skillID,
    skillLevel: skillValue,
    desireLevel: desireValue,
  };

  const response = await request(SET_SKILLS_DESIRE_SKILL_LEVEL, variables);
  return response;
}

module.exports.setSkillsDesireSkillLevel = setSkillsDesireSkillLevel;
