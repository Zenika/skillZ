export const QUERIES = {
  getAgencies: `query getAgencies {
        Agency {
          name
        }
      }`,
  getUser: `query getUser($email: String) {
    User(where: {email: {_eq: $email}}, limit: 1) {
      email
    }
  }  
  `,
  searchTopics: `query searchTopics($input: String) {
    Topic(where: {name: {_ilike: $input}}) {
      id
      name
    }
  }
  `,
  searchSkills: `query searchSkills($input: String) {
    Skill(where: {name: {_ilike: $input}}) {
      id
      name
    }
  }
  `
};
