/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@apollo/client";
import {
  GetUserSkillsAndDesiresDetailByAgencyQuery,
  GetUserSkillsAndDesiresDetailQuery,
} from "../../generated/graphql";
import {
  GET_USERS_SKILLS_AND_DESIRES_DETAIL_BY_AGENCY_QUERY,
  GET_USERS_SKILLS_AND_DESIRES_DETAIL_QUERY,
} from "../../graphql/queries/skills";

const fetchUsersForSkill = (category: string, skill: string) =>
  useQuery<GetUserSkillsAndDesiresDetailQuery>(
    GET_USERS_SKILLS_AND_DESIRES_DETAIL_QUERY,
    {
      variables: { category, skill },
    }
  );

const fetchUsersForSkillByAgency = (
  category: string,
  skill: string,
  agency: string
) =>
  useQuery<GetUserSkillsAndDesiresDetailByAgencyQuery>(
    GET_USERS_SKILLS_AND_DESIRES_DETAIL_BY_AGENCY_QUERY,
    {
      variables: { category, skill, agency },
    }
  );

export const useFetchUsersForSkill = (
  category: string,
  skill: string,
  agency?: string
) => {
  const { data, loading, error } = agency
    ? fetchUsersForSkillByAgency(category, skill, agency)
    : fetchUsersForSkill(category, skill);
  const fetchedSkill = data?.Category[0]?.Skills[0];
  return {
    loading,
    error,
    color: data?.Category[0]?.color,
    data: fetchedSkill?.UsersCurrentSkillsAndDesires.map((userSkillDesire) => ({
      id: fetchedSkill.id,
      name: fetchedSkill.name,
      level: userSkillDesire.skillLevel,
      desire: userSkillDesire.desireLevel,
      certif: false,
      user: {
        name: userSkillDesire.User.name,
        picture: userSkillDesire.User.picture,
        agency: userSkillDesire.User.UserLatestAgency?.agency,
        email: userSkillDesire.User.email,
      },
    })),
  };
};
