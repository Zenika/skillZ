import { useAuth0 } from "@auth0/auth0-react";
import HomePanel from "../components/HomePanel";
import Loading from "../components/Loading";
import { gql, useQuery } from "@apollo/client";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import { useRouter } from "next/router";
import FilterByPanel, { Filter } from "../components/FilterByPanel";
import { useEffect, useState } from "react";
import { FilterData } from "../utils/types";
import { useComputeFilterUrl } from "../utils/useComputeFilterUrl";

type SkillsData = {
  Category: {
    label: string;
    color: string;
    x: string;
    y: string;
    Skills: {
      name: string;
      UserSkills_aggregate: {
        aggregate: {
          avg: {
            level: number;
          };
        };
      };
      TechnicalAppetites_aggregate: {
        aggregate: {
          avg: {
            level: number;
          };
        };
      };
    }[];
  }[];
  Agency: {
    name: string;
  }[];
};

const computeZenikaSkillsQuery = ({ agency }: { agency?: string }) => gql`
  query getSkillsAndTechnicalAppetites${agency ? "($agency: String!)" : ""} {
    Category(order_by: { index: asc }) {
      label
      color
      x
      y
      Skills(
        where: {
          UserSkills: {
            created_at: { _is_null: false }
            ${
              agency
                ? "User: { UserAgencies: { Agency: { name: { _eq: $agency } } } }"
                : ""
            }
          }
        }
      ) {
        name
        UserSkills_aggregate(
          order_by: { userEmail: asc, created_at: desc }
          distinct_on: userEmail
        ) {
          aggregate {
            avg {
              level
            }
            count
          }
        }
        TechnicalAppetites_aggregate(
          order_by: { userEmail: asc, created_at: desc }
          distinct_on: userEmail
        ) {
          aggregate {
            avg {
              level
            }
            count
          }
        }
      }
    }
    Agency {
      name
    }
  }
`;

const Zenika = ({ pathName }) => {
  const { user, isLoading } = useAuth0();
  const { query, push } = useRouter();
  const { context, agency } = query;

  const [filterByAgency, setFilterByAgency] = useState<
    FilterData<string> | undefined
  >(undefined);

  const { data: skillsData, error } = useQuery<SkillsData>(
    computeZenikaSkillsQuery({
      agency: filterByAgency?.selected
        ? filterByAgency?.selected === "World"
          ? undefined
          : filterByAgency?.selected
        : undefined,
    }),
    {
      variables: { email: user.email, agency: filterByAgency?.selected },
      fetchPolicy: "network-only",
    }
  );
  useEffect(() => {
    console.log("useEffect, agency ?", agency);
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
    context: "zenika",
    data: data.Skills.map((skill, i) => ({
      x: skill.UserSkills_aggregate.aggregate.avg.level,
      y: skill.TechnicalAppetites_aggregate.aggregate.avg.level,
      weight: 25,
      labels: [``],
      name: skill.name,
    })),
    certifs: 0,
  })).map((row) => ({
    ...row,
    data: row.data
      .sort((a, b) => -(a.x + a.y - (b.x + b.y)))
      .map((dataRow, i) => ({ ...dataRow, labels: [`${i + 1}`] })),
  }));
  console.log("filterByAgency", filterByAgency);
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
