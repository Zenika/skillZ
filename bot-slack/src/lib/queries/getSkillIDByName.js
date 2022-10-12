const GET_SKILL_ID_BY_NAME = `query getSkillCategoryAndIDByName($name: String!) {
    Skill(where: {name: {_eq: $name}}) {
      id
    }
  }`;

module.exports.GET_SKILL_ID_BY_NAME = GET_SKILL_ID_BY_NAME;
