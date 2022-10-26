const GET_LAST_UPDATED_SKILLS = `
query getSkillInfos($email: String!) {
    UsersCurrentSkillsAndDesires(where: {User: {email: {_eq: $email}}}) {
      skillId
      created_at
    }
  }
`;

module.exports.GET_LAST_UPDATED_SKILLS = GET_LAST_UPDATED_SKILLS;
