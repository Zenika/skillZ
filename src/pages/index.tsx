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
    Skills: {
      name: string;
      UserSkills: {
        level: number;
      };
      TechnicalAppetites: {
        level: number;
      };
    }[];
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
      Skills(
        where: { UserSkills: { userEmail: { _eq: $email } } }
        order_by: { UserSkills_aggregate: { max: { level: desc } } }
      ) {
        name
        UserSkills {
          level
        }
        TechnicalAppetites {
          level
        }
      }
    }
  }
`;

const Home = ({ pathName }) => {
  const { push } = useRouter();
  const { user, isLoading } = useAuth0();

  const { data: userData } = useQuery<UserData>(USER_QUERY, {
    variables: { email: user.email },
    fetchPolicy: "network-only",
  });
  if (userData?.User.length <= 0) {
    push("/onboarding");
  }

  const { data: skillsData, error } = useQuery<SkillsData>(USER_SKILLS_QUERY, {
    variables: { email: user.email },
    fetchPolicy: "cache-and-network",
  });

  const homePanelData = skillsData?.Category.map((data) => ({
    x: data.x,
    y: data.y,
    color: data.color,
    name: data.label,
    data: data.Skills.map((skill) => skill.name),
    certifs: 0,
  }));

  return (
    <PageWithNavAndPanel pathName={pathName}>
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
