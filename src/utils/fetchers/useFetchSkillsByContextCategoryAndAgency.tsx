import { useQuery } from "@apollo/client";
import {
  GetAgenciesAverageCurrentSkillsAndDesiresByCategoryQuery,
  GetSkillsAndDesiresByCategoryQuery,
  GetZenikaAverageCurrentSkillsAndDesiresByCategoryQuery,
  SearchSkillsByCategoryQuery,
} from "../../generated/graphql";
import {
  GET_AGENCIES_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
  GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
  SEARCH_SKILLS_BY_CATEGORY_QUERY,
  GET_ZENIKA_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
} from "../../graphql/queries/skills";
import { FetchedSkill } from "../types";

const fetchMySkills = (
  email: string,
  category: string,
  debouncedSearchValue: string
) => {
  const computeDidYouMeanSearchString = (search: string) => {
    const searches: string[] = [];
    for (let i = 0; i < Math.floor(search.length / 2); ++i) {
      const subString = search.substring(i * 2, i * 2 + 2);
      searches.push(
        `${subString[0].toLowerCase()}${subString[1].toLowerCase()}`
      );
      searches.push(
        `${subString[0].toUpperCase()}${subString[1].toLowerCase()}`
      );
      searches.push(
        `${subString[0].toLowerCase()}${subString[1].toUpperCase()}`
      );
      searches.push(
        `${subString[0].toUpperCase()}${subString[1].toUpperCase()}`
      );
    }
    return `%(${searches.join("|")})%`;
  };
  console.log("debounced", debouncedSearchValue);
  const { data, refetch, loading } = useQuery<SearchSkillsByCategoryQuery>(
    SEARCH_SKILLS_BY_CATEGORY_QUERY,
    {
      variables: {
        email,
        category,
        search: `%${debouncedSearchValue}%`,
        didYouMeanSearch: computeDidYouMeanSearchString(debouncedSearchValue),
      },
    }
  );
  const skillsData: FetchedSkill[] = data?.Skill.map((skill) => ({
    id: skill.id,
    name: skill.name,
    skillLevel: skill.UsersCurrentSkillsAndDesires[0]?.skillLevel,
    desireLevel: skill.UsersCurrentSkillsAndDesires[0]?.desireLevel,
  }));
  console.log("datas in useFetch", data);
  return {
    skillsData,
    color: "green",
    agencies: undefined,
    refetch: (): Promise<any> =>
      refetch({
        email,
        category,
        search: `%${debouncedSearchValue}%`,
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
    data?.Category[0]?.ZenikasAverageCurrentSkillsAndDesires?.map((skill) => ({
      id: skill.skillId,
      name: skill.name,
      skillLevel: skill.averageSkillLevel,
      desireLevel: skill.averageDesireLevel,
      userCount: skill.userCount,
    }));
  return {
    skillsData,
    color: data?.Category[0]?.color,
    agencies: data?.Agency.map((agency) => agency.name),
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
    data?.Category[0]?.AgenciesAverageCurrentSkillsAndDesires?.map((skill) => ({
      id: skill.skillId,
      name: skill.name,
      skillLevel: skill.averageSkillLevel,
      desireLevel: skill.averageDesireLevel,
      userCount: skill.userCount,
    }));
  return {
    skillsData,
    color: data?.Category[0]?.color,
    agencies: data?.Agency.map((agency) => agency.name),
    refetch: (): Promise<any> =>
      refetch({
        agency,
        category,
      }),
    loading,
  };
};
export const useFetchSkillsByContextCategoryAndAgency = (
  context: string,
  category: string,
  agency?: string,
  email?: string,
  debouncedSearchValue?: string
) =>
  context !== "zenika"
    ? fetchMySkills(email, category, debouncedSearchValue)
    : agency && agency !== "World"
    ? fetchZenikasSkillsByAgency(category, agency)
    : fetchZenikasSkills(category);
