import { useAuth0 } from "@auth0/auth0-react";
import HomePanel from "../components/HomePanel";
import Loading from "../components/Loading";
import { gql, useQuery } from "@apollo/client";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import { useRouter } from "next/router";

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
};

const ZENIKA_SKILLS_QUERY = gql`
  query getSkillsAndTechnicalAppetites {
    Category(order_by: { index: asc }) {
      label
      color
      x
      y
      Skills(where: { UserSkills: { created_at: { _is_null: false } } }) {
        name
        UserSkills_aggregate(
          order_by: { userEmail: asc, created_at: desc }
          distinct_on: userEmail
        ) {
          aggregate {
            avg {
              level
            }
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
          }
        }
      }
    }
  }
`;

const Zenika = ({ pathName }) => {
  const { user, isLoading } = useAuth0();
  const { query } = useRouter();
  const { context } = query;

  const { data: skillsData, error } = useQuery<SkillsData>(
    ZENIKA_SKILLS_QUERY,
    {
      variables: { email: user.email },
      fetchPolicy: "network-only",
    }
  );

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
  return (
    <PageWithNavAndPanel pathName={pathName} context={context}>
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
