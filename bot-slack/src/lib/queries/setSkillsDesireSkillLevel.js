const SET_SKILLS_DESIRE_SKILL_LEVEL = `
mutation addUserSkill($email: String!, $skillId: uuid!, $skillLevel: Int!, $desireLevel: Int!) {
    insert_UserSkillDesire(objects: {skillId: $skillId, skillLevel: $skillLevel, desireLevel: $desireLevel, userEmail: $email}, on_conflict: {constraint: UserSkillDesire_userEmail_skillId_created_at_key, update_columns: [skillLevel, desireLevel]}) {
      affected_rows
    }
  }`;

module.exports.SET_SKILLS_DESIRE_SKILL_LEVEL = SET_SKILLS_DESIRE_SKILL_LEVEL;
