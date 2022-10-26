const GET_USERS_BY_AGENCY_AND_TOPICS = `
query getUserByAgencyAndTopic($agency: String!, $topic: String!) {
    User(where: {UserLatestAgency: {agency: {_eq: $agency}}, UserTopics: {Topic: {name: {_eq: $topic}}}}) {
      name
      email
    }
  }
`;
module.exports.GET_USERS_BY_AGENCY_AND_TOPICS = GET_USERS_BY_AGENCY_AND_TOPICS;
