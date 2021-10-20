import { gql } from "@apollo/client";

export class userInfosQueries {
  static INSERT_USER_MUTATION = gql`
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

  static UPSERT_AGENCY_MUTATION = gql`
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

  static INSERT_USER_TOPIC_MUTATION = gql`
    mutation insertUserTopicMutation($email: String!, $topicId: uuid!) {
      insert_UserTopic_one(object: { userEmail: $email, topicId: $topicId }) {
        topicId
      }
    }
  `;

  static DELETE_USER_TOPIC_MUTATION = gql`
    mutation deleteUserTopicMutation($email: String!, $topicId: uuid!) {
      delete_UserTopic(
        where: { topicId: { _eq: $topicId }, userEmail: { _eq: $email } }
      ) {
        affected_rows
      }
    }
  `;

  static USER_INFOS = gql`
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
        CurrentSkillsAndDesires_aggregate(
          where: { userEmail: { _eq: $email } }
        ) {
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
}
