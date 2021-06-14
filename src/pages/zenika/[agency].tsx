import { useAuth0 } from "@auth0/auth0-react";
import HomePanel from "../../components/HomePanel";
import Loading from "../../components/Loading";
import PageWithNavAndPanel from "../../components/PageWithNavAndPanel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FilterData } from "../../utils/types";
import { GetStaticPaths, GetStaticProps } from "next";

type SkillsData = {
  Category: {
    label: string;
    color: string;
    x: string;
    y: string;
    AverageCurrentSkillsAndDesires: {
      name: string;
      averageSkillLevel: number;
      averageDesireLevel: number;
    }[];
    AverageCurrentSkillsAndDesires_aggregate: {
      aggregate: {
        count;
      };
    };
  }[];
  Agency: {
    name: string;
  }[];
};

const computeZenikaSkillsQuery = ({ agency }: { agency?: string }) => `
  query getSkillsAndTechnicalAppetites${agency ? "($agency: String!)" : ""} {
    Category(order_by: {index: asc}) {
      label
      color
      x
      y
      AverageCurrentSkillsAndDesires: ${
        agency ? "Agencies" : "Zenikas"
      }AverageCurrentSkillsAndDesires(order_by: {averageSkillLevel: desc, averageDesireLevel: desc}, limit: 5 ${
  agency ? `, where: {agency: {_eq: $agency}}` : ""
}) {
        name
        averageSkillLevel
        averageDesireLevel
      }
      AverageCurrentSkillsAndDesires_aggregate: ${
        agency ? "Agencies" : "Zenikas"
      }AverageCurrentSkillsAndDesires_aggregate ${
  agency ? `(where: {agency: {_ilike: $agency}})` : ""
} {
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

const Zenika = ({ pathName, skillsData, error }) => {
  const { query, push } = useRouter();
  const { context, agency } = query;

  const [filterByAgency, setFilterByAgency] = useState<
    FilterData<string> | undefined
  >(undefined);

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
                    `${window.location.protocol}//${window.location.host}/zenika/${value}`
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

const NEXT_PUBLIC_GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
if (!NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error("NEXT_PUBLIC_GRAPHQL_URL env variable is not set");
}

const fetcher = async (
  url: string,
  key: string,
  query: string,
  variables: { [key: string]: number | boolean | string }
) => {
  const result = await fetch(url, {
    headers: { "x-hasura-admin-secret": `${key}` },
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  if (!result.ok) {
    return { error: await result.json() };
  }
  return { data: await result.json() };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
  if (!HASURA_ADMIN_SECRET) {
    throw new Error("HASURA_ADMIN_SECRET env variable is not set");
  }
  const agency = context.params?.agency;
  const computedAgency =
    agency === "World" || typeof agency !== "string" ? undefined : agency;
  const { data: skillsData, error } = await fetcher(
    NEXT_PUBLIC_GRAPHQL_URL,
    HASURA_ADMIN_SECRET,
    computeZenikaSkillsQuery({
      agency: computedAgency,
    }),
    { agency: computedAgency }
  );

  return {
    props: {
      skillsData: skillsData.data,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
  if (!HASURA_ADMIN_SECRET) {
    throw new Error("HASURA_ADMIN_SECRET env variable is not set");
  }
  const agencyQuery = `
    {
      Agency {
        name
      }
    }
  `;
  const { data: agencies, error } = await fetcher(
    NEXT_PUBLIC_GRAPHQL_URL,
    HASURA_ADMIN_SECRET,
    agencyQuery,
    {}
  );
  const paths = ["en", "fr"]
    .map((locale) => [
      { params: { agency: "World" }, locale },
      ...agencies?.data?.Agency?.map((agency) => ({
        params: { agency: agency.name },
        locale,
      })),
    ])
    .reduce((previous, current) => [...previous, ...current]);
  return { paths, fallback: true };
};

export default Zenika;
