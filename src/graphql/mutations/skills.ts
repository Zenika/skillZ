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