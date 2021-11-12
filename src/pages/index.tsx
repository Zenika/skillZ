import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import HomePanel from "../components/HomePanel";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import { USER_SKILLS_QUERY, USER_QUERY } from "../graphql/queries/userInfos";
import {
  GetUserSkillsAndTechnicalAppetitesQuery,
  QueryUserQuery,
} from "../generated/graphql";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!NEXT_PUBLIC_BASE_URL) {
  throw new Error(
    "ERROR: App couldn't start because NEXT_PUBLIC_BASE_URL isn't defined"
  );
}

const Home = ({ pathName }) => {
  const { push, query } = useRouter();
  const { context } = query;
  const { user, isLoading } = useAuth0();

  const { data: userData } = useQuery<QueryUserQuery>(USER_QUERY, {
    variables: { email: user.email },
    fetchPolicy: "network-only",
  });
  const link = new URL(`${NEXT_PUBLIC_BASE_URL}/profile`);
  if (userData?.User.length <= 0) {
    push(link);
  }

  const { data: skillsData, error } =
    useQuery<GetUserSkillsAndTechnicalAppetitesQuery>(USER_SKILLS_QUERY, {
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
      x: skill.skillLevel,
      y: skill.desireLevel,
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
