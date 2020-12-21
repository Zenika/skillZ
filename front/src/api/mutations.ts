export const MUTATIONS = {
  createUser: `mutation createUser($email: String!, $agency: String!) {
    insert_User(objects: {UserAgencies: {data: {agency: $agency}}, email: $email}) {
      affected_rows
    }
  }`
};
