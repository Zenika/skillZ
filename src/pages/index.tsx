import { useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HomePanel from "../components/HomePanel";
import Loading from "../components/Loading";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import { config } from "../env";
import {
  GetCurrentUserSkillsAndDesiresQuery,
  GetUserQuery,
} from "../generated/graphql";
import {
  GET_USER_CURRRENT_SKILLS_AND_DESIRES_QUERY,
  GET_USER_QUERY,
} from "../graphql/queries/userInfos";

const Home = ({ pathName }) => {
  const { push, query, replace } = useRouter();
  const { context } = query;
  const { user, isLoading } = useAuth0();

  const { data: userData } = useQuery<GetUserQuery>(GET_USER_QUERY, {
    variables: { email: user.email },
    fetchPolicy: "network-only",
  });
  const link = new URL(`${config.nextPublicBaseUrl}/profile`);
  if (userData?.User.length <= 0) {
    push(link);
  }
  const { data: skillsData, error } =
    useQuery<GetCurrentUserSkillsAndDesiresQuery>(
      GET_USER_CURRRENT_SKILLS_AND_DESIRES_QUERY,
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

  useEffect(() => {
    if (!window.history.state.url) {
      replace("/");
    }
  }, []);

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
