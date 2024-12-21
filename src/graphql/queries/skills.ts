import { gql } from '@apollo/client';

export const GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY = gql`
    query getSkillsAndDesiresByCategory($email: String!, $category: String!) {
        Category(where: { label: { _eq: $category } }) {
            id
            color
            CurrentSkillsAndDesires(
                order_by: { name: asc }
                where: { userEmail: { _eq: $email } }
            ) {
                skillId
                name
                desireLevel
                skillLevel
            }
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
            UserSkillDesires_aggregate(
                where: {
                    User: { email: { _eq: $email }, active: { _eq: true } }
                }
            ) {
                aggregate {
                    count
                }
            }
            UsersCurrentSkillsAndDesires(
                where: {
                    User: { email: { _eq: $email }, active: { _eq: true } }
                }
            ) {
                desireLevel
                skillLevel
                created_at
            }
            Category {
                color
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
            UserSkillDesires_aggregate(
                where: {
                    User: { email: { _eq: $email }, active: { _eq: true } }
                }
            ) {
                aggregate {
                    count
                }
            }
        }
    }
`;

export const SEARCH_SKILLS_PROFILES_CERTIFICATIONS_QUERY = gql`
    query searchSkillsProfilesCertifications($search: String!) {
        skills: ZenikasAverageCurrentSkillsAndDesires(
            where: { name: { _ilike: $search } }
            order_by: { name: asc }
        ) {
            name
            skillId
            skillLevel: averageSkillLevel
            desireLevel: averageDesireLevel
            Category {
                id
                label
                color
            }
            userCount
        }
        profiles: User(
            where: { name: { _ilike: $search }, active: { _eq: true } }
        ) {
            email
            name
            picture
            UserLatestAgency {
                agency
            }
        }
        certificatons: Certification(
            order_by: { name: asc }
            where: { name: { _ilike: $search } }
        ) {
            id
            name
            certBody
            UserCertifications_aggregate(where: { obtained: { _eq: true } }) {
                aggregate {
                    count
                }
            }
        }
    }
`;

export const SEARCH_SKILLS_VERIFIED = gql`
    query searchSkillsVerified($search: String!) {
        Skill(where: { name: { _ilike: $search }, verified: { _eq: true } }) {
            name
        }
    }
`;

export const GET_ZENIKA_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY = gql`
    query getZenikaAverageCurrentSkillsAndDesiresByCategory(
        $category: String!
        $search: String!
    ) {
        Category(
            order_by: { index: asc }
            where: { label: { _eq: $category } }
        ) {
            color
            ZenikasAverageCurrentSkillsAndDesires(
                order_by: { averageSkillLevel: desc, averageDesireLevel: desc }
                where: { name: { _ilike: $search } }
            ) {
                skillId
                name
                averageSkillLevel
                averageDesireLevel
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
        $search: String!
    ) {
        Category(
            order_by: { index: asc }
            where: { label: { _eq: $category } }
        ) {
            color
            AgenciesAverageCurrentSkillsAndDesires(
                order_by: { averageSkillLevel: desc, averageDesireLevel: desc }
                where: { agency: { _eq: $agency }, name: { _ilike: $search } }
            ) {
                skillId
                name
                averageSkillLevel
                averageDesireLevel
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
                    where: { User: { active: { _eq: true } } }
                ) {
                    skillLevel
                    desireLevel
                    User {
                        active
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
                        User: {
                            active: { _eq: true }
                            UserLatestAgency: { agency: { _eq: $agency } }
                        }
                    }
                }
            ) {
                id
                name
                UsersCurrentSkillsAndDesires(
                    order_by: { skillLevel: desc, desireLevel: desc }
                    where: {
                        User: {
                            UserLatestAgency: { agency: { _eq: $agency } }
                            active: { _eq: true }
                        }
                    }
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

export const GET_SKILLS_AND_DESIRES_QUERY = gql`
    query getSkillsAndDesires {
        Category(order_by: { index: asc }) {
            label
            color
            x
            y
            description
            ZenikasAverageCurrentSkillsAndDesires(
                order_by: { averageSkillLevel: desc, averageDesireLevel: desc }
                limit: 5
                where: { userCount: { _neq: "0" } }
            ) {
                skillId
                name
                averageSkillLevel
                averageDesireLevel
            }
            ZenikasAverageCurrentSkillsAndDesires_aggregate(
                where: { userCount: { _neq: "0" } }
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

export const GET_SKILLS_AND_DESIRES_BY_AGENCY_QUERY = gql`
    query getSkillsAndDesiresByAgency($agency: String!) {
        Category(order_by: { index: asc }) {
            label
            color
            x
            y
            description
            AgenciesAverageCurrentSkillsAndDesires(
                order_by: { averageSkillLevel: desc, averageDesireLevel: desc }
                limit: 5
                where: { agency: { _eq: $agency } }
            ) {
                skillId
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

export const GET_SKILL_ID_BY_NAME = gql`
    query getSkillCategoryAndIDByName($name: String!) {
        Skill(where: { name: { _eq: $name } }) {
            id
        }
    }
`;

export const GET_ALL_VERIFIED_SKILL = gql`
    query getAllVerifiedSkills($search: String!) {
        Skill(where: { name: { _ilike: $search } }, order_by: { name: asc }) {
            name
            id
            description
            verified
            categoryId
            SkillTags {
                tagId
            }
            SkillTopics {
                topicId
            }
        }
    }
`;

export const GET_ALL_NOT_VERIFIED_SKILL = gql`
    query getAllNotVerifiedSkills {
        Skill(where: { verified: { _eq: false } }) {
            name
            id
            verified
        }
    }
`;

export const GET_ALL_SKILL = gql`
    query getAllSkills($search: String!) {
        Skill(where: { name: { _ilike: $search } }, order_by: { name: asc }) {
            name
            id
            description
            verified
            categoryId
            SkillTags {
                tagId
            }
            SkillTopics {
                topicId
            }
        }
    }
`;

export const GET_SKILL_MANDATORY_FIELDS = gql`
    query skillMandatoryFields($skillId: uuid!) {
        Skill(where: { id: { _eq: $skillId } }) {
            SkillTags {
                skillId
                tagId
            }
            SkillTopics {
                topicId
                skillId
            }
            description
            name
            categoryId
            verified
            id
        }
    }
`;

export const GET_SKILL_DETAILS = gql`
    query skillDetails($skillId: uuid!, $email: String!) {
        Skill(where: { id: { _eq: $skillId } }) {
            description
            name
            id
            SkillTopics {
                Topic {
                    id
                    name
                }
            }
            UserSkillDesires(where: { userEmail: { _eq: $email } }) {
                created_at
            }
            SkillTags {
                Tag {
                    name
                }
            }
        }
    }
`;

export const GET_SKILLTAGS_BY_SKILL = gql`
    query skillTagsBySkill($skillId: uuid!) {
        SkillTag(where: { skillId: { _eq: $skillId } }) {
            tagId
            skillId
            Tag {
                name
            }
        }
    }
`;

export const GET_ALL_TAGS = gql`
    query getAllTags {
        Tag {
            name
            id
        }
    }
`;

export const SEARCH_IN_ALL_TAGS = gql`
    query searchAllTags($search: String!, $tagIds: [Int!]!) {
        Tag(
            where: { name: { _ilike: $search }, id: { _nin: $tagIds } }
            order_by: { name: asc }
        ) {
            name
            id
        }
    }
`;

export const GET_TAG_FROM_TAGNAME = gql`
    query getTagFromTagName($tagName: String!) {
        Tag(where: { name: { _eq: $tagName } }) {
            name
            id
        }
    }
`;

export const GET_USER_SKILLS_ID = gql`
    query getUserSkillsId($email: String!) {
        UserSkillDesire(where: { userEmail: { _eq: $email } }) {
            id
        }
    }
`;
