export const QUERIES = {
  getAgencies: `query getAgencies {
        Agency {
          name
        }
      }`,
  getUser: `query getUser($email: String) {
    User(where: {email: {_eq: $email}}, limit: 1) {
      agency
      email
    }
  }  
  `,
};
