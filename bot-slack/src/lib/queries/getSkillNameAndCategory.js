const GET_SKILL_NAME_AND_CATEGORY_BY_ID = `query getSkillInfosFromID($skill: uuid!) {
    Skill_by_pk(id: $skill) {
      name
      Category {
        label
      }
    }
  }`;

module.exports.GET_SKILL_NAME_AND_CATEGORY_BY_ID =
  GET_SKILL_NAME_AND_CATEGORY_BY_ID;
