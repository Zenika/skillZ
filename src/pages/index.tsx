import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import HomePanel from "../components/HomePanel";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";

type UserData = {
  User: {
    email: string;
  }[];
};

type SkillsData = {
  Category: {
    label: string;
    color: string;
    x: string;
    y: string;
    CurrentSkillsAndDesires: {
      name: string;
      level: number;
      desire: number;
    }[];
    CurrentSkillsAndDesires_aggregate: {
      aggregate: {
        count;
      };
    };
  }[];
};

const USER_QUERY = gql`
  query queryUser($email: String!) {
    User(where: { email: { _eq: $email } }) {
      email
    }
  }
`;

const USER_SKILLS_QUERY = gql`
  query getUserSkillsAndTechnicalAppetites($email: String!) {
    Category(order_by: { index: asc }) {
      label
      color
      x
      y
      CurrentSkillsAndDesires(
        limit: 5
        order_by: { level: desc, desire: desc }
        where: { userEmail: { _eq: $email } }
      ) {
        name
        desire
        level
      }
      CurrentSkillsAndDesires_aggregate(where: { userEmail: { _eq: $email } }) {
        aggregate {
          count
        }
      }
    }
  }
`;

const Home = ({ pathName }) => {
  const { push, query } = useRouter();
  const { context } = query;
  const { user, isLoading } = useAuth0();

  const { data: userData } = useQuery<UserData>(USER_QUERY, {
    variables: { email: user.email },
    fetchPolicy: "network-only",
  });
  if (userData?.User.length <= 0) {
    push("/profile");
  }

  const { data: skillsData, error } = useQuery<SkillsData>(USER_SKILLS_QUERY, {
    variables: { email: user.email },
    fetchPolicy: "network-only",
  });

  const homePanelData = skillsData?.Category.map((data) => ({
    x: data.x,
    y: data.y,
    color: data.color,
    name: data.label,
    count: data.CurrentSkillsAndDesires_aggregate.aggregate.count,
    context: "mine",
    data: data.CurrentSkillsAndDesires.map((skill, i) => ({
      x: skill.level,
      y: skill.desire,
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

export default withAuthenticationRequired(Home);
