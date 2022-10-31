const GETLASTUPDATES = `
query getlastInfosUpdate($email: String!) {
    UserSkillDesire(where: {userEmail: {_eq: $email}}, limit: 1, order_by: {created_at: desc}) {
      created_at
    }
  }  
`;

module.exports.GETLASTUPDATES = GETLASTUPDATES;
