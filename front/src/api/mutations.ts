export const MUTATIONS = {
  createUser: `mutation createUser($email: String, $agencyId: uuid, $firstName: String, $lastName: String) {
        insert_User(objects: {email: $email, agencyId: $agencyId, firstName: $firstName, lastName: $lastName}) {
          returning {
            agencyId
            email
            firstName
            lastName
          }
        }
      }
      `,
};
