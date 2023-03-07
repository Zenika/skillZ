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

export const INSERT_SKILL = gql`
  mutation insertSkill($name: String!, $categoryId: uuid!, $creator: String!) {
    insert_Skill(
      objects: { name: $name, categoryId: $categoryId, creator: $creator }
    ) {
      returning {
        id
        name
        creator
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

export const ADD_SKILL_TO_TOPIC = gql`
  mutation addSkillToTopic($skillId: uuid!, $topicId: uuid!) {
    insert_SkillTopic(objects: { skillId: $skillId, topicId: $topicId }) {
      affected_rows
      returning {
        skillId
        topicId
      }
    }
  }
`;

export const DELETE_SKILL_TO_TOPIC = gql`
  mutation deleteSkillToTopic($skillId: uuid!, $topicId: uuid!) {
    delete_SkillTopic(
      where: { skillId: { _eq: $skillId }, topicId: { _eq: $topicId } }
    ) {
      affected_rows
      returning {
        skillId
        topicId
      }
    }
  }
`;

export const EDIT_SKILL = gql`
  mutation editSkill($id: uuid!, $categoryId: uuid!) {
    update_Skill(
      where: { id: { _eq: $id } }
      _set: { categoryId: $categoryId }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_SKILL_TO_TAG = gql`
  mutation insertSkillToTag($skillId: uuid!, $tagId: Int!) {
    insert_SkillTag(objects: { skillId: $skillId, tagId: $tagId }) {
      affected_rows
    }
  }
`;

export const DELETE_SKILL_TO_TAG = gql`
  mutation deleteSkillToTag($skillId: uuid!, $tagId: Int!) {
    delete_SkillTag(
      where: { skillId: { _eq: $skillId }, tagId: { _eq: $tagId } }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_SKILL_DESCRIPTION = gql`
  mutation updateSkillDescription($skillId: uuid!, $desc: String!) {
    update_Skill(
      where: { id: { _eq: $skillId } }
      _set: { description: $desc }
    ) {
      affected_rows
      returning {
        description
      }
    }
  }
`;

export const UPDATE_SKILL_CREATOR = gql`
  mutation updateSkillCreator($creator: String!, $skillId: uuid!) {
    update_Skill(
      where: { id: { _eq: $skillId } }
      _set: { creator: $creator }
    ) {
      affected_rows
    }
  }
`;
