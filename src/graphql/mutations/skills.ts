import gql from "graphql-tag";

export const ADD_USER_SKILL_MUTATION = gql`
  mutation addUserSkill(
    $email: String!
    $skillId: uuid!
    $skillLevel: Int!
    $desireLevel: Int!
  ) {
    insert_UserSkillDesire(
      objects: {
        skillId: $skillId
        skillLevel: $skillLevel
        desireLevel: $desireLevel
        userEmail: $email
      }
      on_conflict: {
        constraint: UserSkillDesire_userEmail_skillId_created_at_key
        update_columns: [skillLevel, desireLevel]
      }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_SKILL_MUTATION = gql`
  mutation insertSkillMutation($name: String!, $categoryId: uuid!) {
    insert_Skill(objects: { name: $name, categoryId: $categoryId }) {
      returning {
        id
        name
      }
    }
  }
`;

export const DELETE_SKILL_MUTATION = gql`
  mutation DeleteSkill($skillId: uuid!) {
    delete_Skill(where: { id: { _eq: $skillId } }) {
      affected_rows
    }
  }
`;

export const UPDATE_SKILL_VERIFIED_MUTATION = gql`
  mutation setVerifiedSkillMutation($skillId: uuid!, $verified: Boolean!) {
    update_Skill(
      where: { id: { _eq: $skillId } }
      _set: { verified: $verified }
    ) {
      affected_rows
    }
  }
`;
