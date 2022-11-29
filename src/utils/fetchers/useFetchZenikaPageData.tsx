import { useQuery } from "@apollo/client";
import {
  GetSkillsAndDesiresByAgencyQuery,
  GetSkillsAndDesiresQuery,
} from "../../generated/graphql";
import {
  GET_SKILLS_AND_DESIRES_BY_AGENCY_QUERY,
  GET_SKILLS_AND_DESIRES_QUERY,
} from "../../graphql/queries/skills";

const fetchZenikaPageDataByAgency = (email: string, agency: string) => {
  const {
    data: skillsData,
    error,
    loading,
  } = useQuery<GetSkillsAndDesiresByAgencyQuery>(
    GET_SKILLS_AND_DESIRES_BY_AGENCY_QUERY,
    {
      variables: { agency },
    }
  );
  const homePanelData = skillsData?.Category?.map((data) => ({
    x: data?.x,
    y: data?.y,
    color: data?.color,
    name: data?.label,
    description: data?.description,
    count:
      data?.AgenciesAverageCurrentSkillsAndDesires_aggregate?.aggregate.count,
    context: "zenika",
    data:
      data?.AgenciesAverageCurrentSkillsAndDesires?.map((skill, i) => ({
        x: skill.averageSkillLevel,
        y: skill.averageDesireLevel,
        weight: 25,
        labels: [``],
        name: skill.name,
      })) || [],
    certifs: 0,
  })).map((row) => ({
    ...row,
    data: row.data?.map((dataRow, i) => ({
      ...dataRow,
      labels: [`${i + 1}`],
    })),
  }));
  return { homePanelData, agencies: skillsData?.Agency, error, loading };
};
const fetchZenikaPageData = (email: string) => {
  const {
    data: skillsData,
    error,
    loading,
  } = useQuery<GetSkillsAndDesiresQuery>(GET_SKILLS_AND_DESIRES_QUERY);
  const homePanelData = skillsData?.Category?.map((data) => ({
    x: data?.x,
    y: data?.y,
    color: data?.color,
    name: data?.label,
    description: data?.description,
    count:
      data?.ZenikasAverageCurrentSkillsAndDesires_aggregate?.aggregate.count,
    context: "zenika",
    data:
      data?.ZenikasAverageCurrentSkillsAndDesires?.map((skill, i) => ({
        x: skill.averageSkillLevel,
        y: skill.averageDesireLevel,
        weight: 25,
        labels: [``],
        name: skill.name,
      })) || [],
    certifs: 0,
  })).map((row) => ({
    ...row,
    data: row.data?.map((dataRow, i) => ({ ...dataRow, labels: [`${i + 1}`] })),
  }));
  return { homePanelData, agencies: skillsData?.Agency, error, loading };
};

export const useFetchZenikaPageData = (
  email: string,
  agency: string | undefined
) =>
  !agency || agency === "World"
    ? fetchZenikaPageData(email)
    : fetchZenikaPageDataByAgency(email, agency);
