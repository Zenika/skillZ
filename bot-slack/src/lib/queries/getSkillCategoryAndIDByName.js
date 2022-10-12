const GET_SKILL_CATEGORY_AND_ID_BY_NAME = `
query getSkillCategoryAndIDByName($name: String!) {
    Skill(where: {name: {_eq: $name}}) {
      Category {
        label
      }
      id
    }
  }`;

module.exports.GET_SKILL_CATEGORY_AND_ID_BY_NAME =
  GET_SKILL_CATEGORY_AND_ID_BY_NAME;
