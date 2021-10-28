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

export const UPSERT_AGENCY_MUTATION = gql`
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

export const USER_QUERY = gql`
  query queryUser($email: String!) {
    User(where: { email: { _eq: $email } }) {
      email
      name
      picture
      UserLatestAgency {
        agency
      }
    }
  }
`;

export const USER_INFOS = gql`
  query getUserAgencyAndAllAgencies($email: String!) {
    User(where: { email: { _eq: $email } }) {
      email
      name
      picture
      UserLatestAgency {
        agency
      }
    }
    Agency {
      name
    }
    Topic {
      id
      name
      UserTopics(where: { userEmail: { _eq: $email } }) {
        created_at
      }
    }
    UserAchievements(where: { userEmail: { _eq: $email } }) {
      additionalInfo
      created_at
      label
      points
      step
      userEmail
    }
    Category {
      label
      CurrentSkillsAndDesires_aggregate(where: { userEmail: { _eq: $email } }) {
        aggregate {
          count
        }
      }
      CurrentSkillsAndDesires(
        limit: 5
        order_by: { desireLevel: desc }
        where: { userEmail: { _eq: $email } }
      ) {
        name
        skillLevel
        desireLevel
      }
    }
    UserTopic_aggregate(where: { userEmail: { _eq: $email } }) {
      aggregate {
        count
      }
    }
  }
`;

export const USER_SKILLS_QUERY = gql`
  query getUserSkillsAndTechnicalAppetites($email: String!) {
    Category(order_by: { index: asc }) {
      label
      color
      x
      y
      CurrentSkillsAndDesires(
        limit: 5
        order_by: { skillLevel: desc, desireLevel: desc }
        where: { userEmail: { _eq: $email } }
      ) {
        name

        skillLevel
        desireLevel
      }
      CurrentSkillsAndDesires_aggregate(where: { userEmail: { _eq: $email } }) {
        aggregate {
          count
        }
      }
    }
  }
`;