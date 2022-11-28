import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query getUser($email: String!) {
    User(where: { email: { _eq: $email } }) {
      email
      name
      picture
      UserLatestAgency {
        agency
      }
      last_login
      current_login
    }
  }
`;

export const GET_USER_AGENCY_AND_ALL_AGENCIES_QUERY = gql`
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
    }
    Certification {
      id
      name
      verified
      certBody
    }
    UserCertification(where: { userEmail: { _eq: $email } }) {
      to
      url
      obtained
      from
      Certification {
        id
        name
        verified
        certBody
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
    UserTopic(where: { userEmail: { _eq: $email } }) {
      topicId
    }
  }
`;

export const GET_USER_CURRRENT_SKILLS_AND_DESIRES_QUERY = gql`
  query getCurrentUserSkillsAndDesires($email: String!) {
    Category(order_by: { index: asc }) {
      label
      color
      x
      y
      description
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

export const GET_USER_AGENCY_QUERY = gql`
  query getUserAgency($email: String!) {
    UserLatestAgency(where: { userEmail: { _eq: $email } }) {
      agency
    }
  }
`;
