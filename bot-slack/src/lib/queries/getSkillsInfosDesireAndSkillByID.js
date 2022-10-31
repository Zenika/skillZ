const GET_SKILLS_INFOS_DESIRE_AND_SKILL_BY_ID = `
query getSkillInfosFromEmailAndID($email: String!, $id: uuid!) {
  User(where: {email: {_eq: $email}}) {
    UserSkillDesires(where: {Skill: {id: {_eq: $id}}}, limit: 1, order_by: {created_at: desc}) {
      skillId
      skillLevel
      desireLevel
      created_at
    }
  }
}`;

module.exports.GET_SKILLS_INFOS_DESIRE_AND_SKILL_BY_ID =
  GET_SKILLS_INFOS_DESIRE_AND_SKILL_BY_ID;
