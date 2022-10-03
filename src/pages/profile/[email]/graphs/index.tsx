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
import { useEffect, useState } from "react";
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
  const { data: userInfosDatas, error: errorUserInfos } =
    useQuery<GetUserQuery>(GET_USER_QUERY, {
      variables: { email: query?.email },
      fetchPolicy: "network-only",
    });

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
  const [userInfos, setUserInfos] = useState(null);

  useEffect(() => {
    if (userInfosDatas) setUserInfos(userInfosDatas.User[0]);
    console.log("userInfos", userInfos);
  }, [userInfosDatas]);

  return (
    <PageWithNavAndPanel pathName={pathName} context={context}>
      {userInfos?.picture && console.log("picture", userInfos.picture)}
      <div className="flex flex-row mb-4 p-2 w-full gradient-red  rounded">
        <img
          className="w-16 h-16 rounded-full"
          height="64"
          width="64"
          src={userInfos?.picture}
        />
        <div className="flex flex-col mx-4 justify-center">
          <p className="opacity-70">Page of the Skillz graph of</p>
          <p className="uppercase">{userInfos?.name}</p>
        </div>
      </div>
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
