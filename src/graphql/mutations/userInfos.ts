import { gql } from "@apollo/client";

export const INSERT_USER_MUTATION = gql`
  mutation insertUserMutation(
    $email: String!
    $name: String!
    $picture: String!
  ) {
    insert_User(
      objects: { email: $email, name: $name, picture: $picture }
      on_conflict: { constraint: User_pkey, update_columns: [name, picture] }
    ) {
      affected_rows
    }
  }
`;

export const UPSERT_USER_AGENCY_MUTATION = gql`
  mutation insertUserAgencyMutation($email: String!, $agency: String!) {
    insert_UserAgency_one(
      object: { userEmail: $email, agency: $agency }
      on_conflict: {
        constraint: UserAgency_pkey
        update_columns: [agency, created_at]
      }
    ) {
      agency
    }
  }
`;

export const INSERT_USER_TOPIC_MUTATION = gql`
  mutation insertUserTopicMutation($email: String!, $topicId: uuid!) {
    insert_UserTopic_one(object: { userEmail: $email, topicId: $topicId }) {
      topicId
    }
  }
`;

export const DELETE_USER_TOPIC_MUTATION = gql`
  mutation deleteUserTopicMutation($email: String!, $topicId: uuid!) {
    delete_UserTopic(
      where: { topicId: { _eq: $topicId }, userEmail: { _eq: $email } }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_USER_SKILL_MUTATION = gql`
  mutation deleteSkillLevelsByUser($email: String!, $skillId: uuid!) {
    delete_UserSkillDesire(
      where: { userEmail: { _eq: $email }, skillId: { _eq: $skillId } }
    ) {
      affected_rows
    }
  }
`;
