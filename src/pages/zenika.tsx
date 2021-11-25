import { useAuth0 } from "@auth0/auth0-react";
import HomePanel from "../components/HomePanel";
import Loading from "../components/Loading";
import { gql, useQuery } from "@apollo/client";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FilterData } from "../utils/types";
import { useComputeFilterUrl } from "../utils/useComputeFilterUrl";
import {
  GET_SKILLS_AND_DESIRES,
  GET_SKILLS_AND_DESIRES_BY_AGENCY,
} from "../graphql/queries/skills";
import { GetSkillsAndDesiresByAgencyQuery } from "../generated/graphql";

const Zenika = ({ pathName }) => {
  const { user, isLoading } = useAuth0();
  const { query, push } = useRouter();
  const { context, agency } = query;

  const [filterByAgency, setFilterByAgency] = useState<
    FilterData<string> | undefined
  >(undefined);

  const { data: skillsData, error } =
    useQuery<GetSkillsAndDesiresByAgencyQuery>(
      filterByAgency?.selected
        ? GET_SKILLS_AND_DESIRES_BY_AGENCY
          ? GET_SKILLS_AND_DESIRES
          : GET_SKILLS_AND_DESIRES_BY_AGENCY
        : GET_SKILLS_AND_DESIRES,
      {
        variables: { email: user.email, agency: filterByAgency?.selected },
        fetchPolicy: "network-only",
      }
    );
  useEffect(() => {
    setFilterByAgency({
      name: "Agency",
      values: skillsData?.Agency.map((agency) => agency.name) || [],
      selected: agency
        ? typeof agency === "string"
          ? agency
          : agency.join("-")
        : undefined,
    });
  }, [agency, skillsData]);

  const homePanelData = skillsData?.Category.map((data) => ({
    x: data.x,
    y: data.y,
    color: data.color,
    name: data.label,
    count: data.AverageCurrentSkillsAndDesires_aggregate.aggregate.count,
    context: "zenika",
    data: data.AverageCurrentSkillsAndDesires.map((skill, i) => ({
      x: skill.averageSkillLevel,
      y: skill.averageDesireLevel,
      weight: 25,
      labels: [``],
      name: skill.name,
    })),
    certifs: 0,
  })).map((row) => ({
    ...row,
    data: row.data.map((dataRow, i) => ({ ...dataRow, labels: [`${i + 1}`] })),
  }));
  return (
    <PageWithNavAndPanel
      pathName={pathName}
      context={context}
      filters={
        filterByAgency
          ? [
              {
                name: filterByAgency.name,
                values: ["World", ...filterByAgency.values],
                selected: filterByAgency.selected,
                callback: (value) =>
                  push(
                    useComputeFilterUrl(
                      `${window.location}`,
                      value ? [{ name: "agency", value: `${value}` }] : []
                    )
                  ),
              },
            ]
          : undefined
      }
    >
      <div className="flex flex-auto flex-row mx-4 flex-wrap mb-20">
        {homePanelData ? (
          homePanelData.map((computedDataSkill) => (
            <HomePanel
              props={computedDataSkill}
              key={`home-panel-${computedDataSkill.name}`}
            />
          ))
        ) : error ? (
          <p>{`Error: ${error.name}, Message: ${error.message}`}</p>
        ) : (
          <Loading />
        )}
      </div>
    </PageWithNavAndPanel>
  );
};

export default Zenika;
