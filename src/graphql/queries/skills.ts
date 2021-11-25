import { gql } from "@apollo/client";

export const GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY = gql`
  query getSkillsAndDesiresByCategory($email: String!, $category: String!) {
    Category(where: { label: { _eq: $category } }) {
      id
      color
      CurrentSkillsAndDesires(
        order_by: { skillLevel: desc, desireLevel: desc }
        where: { userEmail: { _eq: $email } }
      ) {
        id: skillId
        name
        desireLevel
        skillLevel
      }
    }
    Agency {
      name
    }
  }
`;

export const SEARCH_SKILLS_BY_CATEGORY_QUERY = gql`
  query searchSkillsByCategory(
    $search: String!
    $category: String!
    $email: String!
    $didYouMeanSearch: String!
  ) {
    Skill(
      where: {
        Category: { label: { _eq: $category } }
        name: { _ilike: $search }
      }
      order_by: { name: asc }
    ) {
      name
      id
      UserSkillDesires_aggregate(where: { User: { email: { _eq: $email } } }) {
        aggregate {
          count
        }
      }
    }
    didYouMeanSearch: Skill(
      where: {
        Category: { label: { _eq: $category } }
        name: { _similar: $didYouMeanSearch }
      }
    ) {
      name
      id
      UserSkillDesires_aggregate(where: { User: { email: { _eq: $email } } }) {
        aggregate {
          count
        }
      }
    }
  }
`;

export const SEARCH_SKILLS_AND_PROFILES_QUERY = gql`
  query searchSkillsAndProfiles($search: String!) {
    skills: ZenikasAverageCurrentSkillsAndDesires(
      where: { name: { _ilike: $search } }
      order_by: { name: asc }
    ) {
      name
      skillLevel: averageSkillLevel
      desireLevel: averageDesireLevel
      Category {
        label
      }
    }
    profiles: User(where: { name: { _ilike: $search } }) {
      email
      name
      picture
      UserLatestAgency {
        agency
      }
    }
  }
`;

export const GET_ZENIKA_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY = gql`
  query getZenikaAverageCurrentSkillsAndDesiresByCategory($category: String!) {
    Category(order_by: { index: asc }, where: { label: { _eq: $category } }) {
      color
      ZenikasAverageCurrentSkillsAndDesires(
        order_by: { averageSkillLevel: desc, averageDesireLevel: desc }
      ) {
        id: skillId
        name
        skillLevel: averageSkillLevel
        desireLevel: averageDesireLevel
        userCount
      }
    }
    Agency {
      name
    }
  }
`;

export const GET_AGENCIES_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY = gql`
  query getAgenciesAverageCurrentSkillsAndDesiresByCategory(
    $category: String!
    $agency: String!
  ) {
    Category(order_by: { index: asc }, where: { label: { _eq: $category } }) {
      color
      AgenciesAverageCurrentSkillsAndDesires(
        order_by: { averageSkillLevel: desc, averageDesireLevel: desc }
        where: { agency: { _eq: $agency } }
      ) {
        id: skillId
        name
        skillLevel: averageSkillLevel
        desireLevel: averageDesireLevel
        userCount
      }
    }
    Agency {
      name
    }
  }
`;

export const GET_USERS_SKILLS_AND_DESIRES_DETAIL_QUERY = gql`
  query getUserSkillsAndDesiresDetail($category: String!, $skill: String!) {
    Category(where: { label: { _eq: $category } }) {
      color
      Skills(where: { name: { _eq: $skill } }) {
        id
        name
        UsersCurrentSkillsAndDesires(
          order_by: { skillLevel: desc, desireLevel: desc }
        ) {
          skillLevel
          desireLevel
          User {
            name
            picture
            email
            UserLatestAgency {
              agency
            }
          }
        }
      }
    }
  }
`;

export const GET_USERS_SKILLS_AND_DESIRES_DETAIL_BY_AGENCY_QUERY = gql`
  query getUserSkillsAndDesiresDetailByAgency(
    $category: String!
    $skill: String!
    $agency: String!
  ) {
    Category(where: { label: { _eq: $category } }) {
      color
      Skills(
        where: {
          name: { _eq: $skill }
          UserSkillDesires: {
            User: { UserLatestAgency: { agency: { _eq: $agency } } }
          }
        }
      ) {
        id
        name
        UsersCurrentSkillsAndDesires(
          order_by: { skillLevel: desc, desireLevel: desc }
          where: { User: { UserLatestAgency: { agency: { _eq: $agency } } } }
        ) {
          skillLevel
          desireLevel
          User {
            name
            picture
            email
            UserLatestAgency {
              agency
            }
          }
        }
      }
    }
  }
`;

export const GET_SKILLS_AND_DESIRES = gql`
  query getSkillsAndDesires {
    Category(order_by: { index: asc }) {
      label
      color
      x
      y
      ZenikasAverageCurrentSkillsAndDesires(
        order_by: { averageSkillLevel: desc, averageDesireLevel: desc }
        limit: 5
      ) {
        name
        averageSkillLevel
        averageDesireLevel
      }
      ZenikasAverageCurrentSkillsAndDesires_aggregate {
        aggregate {
          count(columns: skillId, distinct: true)
        }
      }
    }
    Agency {
      name
    }
  }
`;

export const GET_SKILLS_AND_DESIRES_BY_AGENCY = gql`
  query getSkillsAndDesiresByAgency($agency: String!) {
    Category(order_by: { index: asc }) {
      label
      color
      x
      y
      AgenciesAverageCurrentSkillsAndDesires(
        order_by: { averageSkillLevel: desc, averageDesireLevel: desc }
        limit: 5
        where: { agency: { _eq: $agency } }
      ) {
        name
        averageSkillLevel
        averageDesireLevel
      }
      AgenciesAverageCurrentSkillsAndDesires_aggregate(
        where: { agency: { _eq: $agency } }
      ) {
        aggregate {
          count(columns: skillId, distinct: true)
        }
      }
    }
    Agency {
      name
    }
  }
`;