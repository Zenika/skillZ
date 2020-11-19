export const QUERIES = {
  getAgencies: `query getAgencies {
        Agency {
          id
        }
      }`,
  getUser: `query getUser($email: String) {
    User(where: {email: {_eq: $email}}, limit: 1) {
      Agency {
        id
        name
      }
      email
      firstName
      lastName
    }
  }
  `,
};
