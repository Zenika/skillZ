import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@apollo/client";
import HomePanel from "../../../../components/HomePanel";
import { useRouter } from "next/router";
import {
  GetCurrentUserSkillsAndDesiresQuery,
  GetUserQuery,
} from "../../../../generated/graphql";
import {
  GET_USER_CURRRENT_SKILLS_AND_DESIRES_QUERY,
  GET_USER_QUERY,
} from "../../../../graphql/queries/userInfos";
import Loading from "../../../../components/Loading";
import { useEffect } from "react";
import PageWithNavAndPanel from "../../../../components/PageWithNavAndPanel";

type HomePanelProps = {
  props: {
    x: string;
    y: string;
    context: string;
    color: string;
    name: string;
    count: number;
    data: {
      x: number;
      y: number;
      weight: number;
      labels: string[];
      name: string;
    }[];
    certifs: number;
  };
};

const HomePanelByUser = ({ pathName }) => {
  const { query } = useRouter();
  const { context } = query;

  console.log("pathName in radars", pathName);
  const { data: skillsData, error } =
    useQuery<GetCurrentUserSkillsAndDesiresQuery>(
      GET_USER_CURRRENT_SKILLS_AND_DESIRES_QUERY,
      {
        variables: { email: query?.email },
        fetchPolicy: "network-only",
      }
    );

  const homePanelData = skillsData?.Category.map((data) => ({
    x: data.x,
    y: data.y,
    color: data.color,
    name: data.label,
    count: data.CurrentSkillsAndDesires_aggregate.aggregate.count,
    context: `${query.email}`,
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
    console.log("datas", skillsData);
  }, [skillsData]);

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

export default HomePanelByUser;
