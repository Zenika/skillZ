import { useQuery } from "@apollo/client";
import {
  GetAgenciesAverageCurrentSkillsAndDesiresByCategoryQuery,
  GetSkillsAndDesiresByCategoryQuery,
  GetZenikaAverageCurrentSkillsAndDesiresByCategoryQuery,
} from "../../generated/graphql";
import {
  GET_AGENCIES_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
  GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
  GET_ZENIKA_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
} from "../../graphql/queries/skills";
import { FetchedSkill } from "../types";

const fetchMySkills = (email: string, category: string) => {
  const { data, refetch, loading } =
    useQuery<GetSkillsAndDesiresByCategoryQuery>(
      GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
      {
        variables: {
          email,
          category,
        },
      }
    );
  const skillsData: FetchedSkill[] =
    data?.Category[0]?.CurrentSkillsAndDesires.map((skill) => ({
      id: skill.skillId,
      name: skill.name,
      skillLevel: skill.skillLevel,
      desireLevel: skill.desireLevel,
    }));
  return {
    skillsData,
    color: data?.Category[0]?.color,
    agencies: undefined,
    refetch: (): Promise<any> =>
      refetch({
        email,
        category,
      }),
    loading,
  };
};

const fetchZenikasSkills = (category: string) => {
  const { data, refetch, loading } =
    useQuery<GetZenikaAverageCurrentSkillsAndDesiresByCategoryQuery>(
      GET_ZENIKA_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
      {
        variables: {
          category,
        },
      }
    );
  const skillsData: FetchedSkill[] =
    data?.Category[0]?.ZenikasAverageCurrentSkillsAndDesires.map((skill) => ({
      id: skill.skillId,
      name: skill.name,
      skillLevel: skill.averageSkillLevel,
      desireLevel: skill.averageDesireLevel,
      userCount: skill.userCount,
    }));
  return {
    skillsData,
    color: data?.Category[0]?.color,
    agencies: data.Agency.map((agency) => agency.name),
    refetch: (): Promise<any> =>
      refetch({
        category,
      }),
    loading,
  };
};
const fetchZenikasSkillsByAgency = (category: string, agency: string) => {
  const { data, refetch, loading } =
    useQuery<GetAgenciesAverageCurrentSkillsAndDesiresByCategoryQuery>(
      GET_AGENCIES_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
      {
        variables: {
          category,
          agency,
        },
      }
    );
  const skillsData: FetchedSkill[] =
    data?.Category[0]?.AgenciesAverageCurrentSkillsAndDesires.map((skill) => ({
      id: skill.skillId,
      name: skill.name,
      skillLevel: skill.averageSkillLevel,
      desireLevel: skill.averageDesireLevel,
      userCount: skill.userCount,
    }));
  return {
    skillsData,
    color: data?.Category[0]?.color,
    agencies: data.Agency.map((agency) => agency.name),
    refetch: (): Promise<any> =>
      refetch({
        agency,
        category,
      }),
    loading,
  };
};
export const useFetchSkillsByContextCategoryAndAgency = (
  category: string,
  agency?: string,
  email?: string
) =>
  email
    ? fetchMySkills(email, category)
    : agency
    ? fetchZenikasSkillsByAgency(category, agency)
    : fetchZenikasSkills(category);
