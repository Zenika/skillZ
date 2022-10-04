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
import { useEffect, useState, useContext } from "react";
import PageWithNavAndPanel from "../../../../components/PageWithNavAndPanel";
import { i18nContext } from "../../../../utils/i18nContext";
import UserInfosTopBar from "../../../../components/UserInfosTopBar";

const HomePanelByUser = ({ pathName }) => {
  const { query } = useRouter();
  const { context } = query;
  const { t } = useContext(i18nContext);

  const { data: skillsData, error } =
    useQuery<GetCurrentUserSkillsAndDesiresQuery>(
      GET_USER_CURRRENT_SKILLS_AND_DESIRES_QUERY,
      {
        variables: { email: query?.email },
        fetchPolicy: "network-only",
      }
    );
  const { data: userInfosDatas } = useQuery<GetUserQuery>(GET_USER_QUERY, {
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
  }, [userInfosDatas]);

  return (
    <PageWithNavAndPanel pathName={pathName} context={context}>
      <UserInfosTopBar
        userEmail={userInfos?.email}
        userName={userInfos?.name}
        userPicture={userInfos?.picture}
        sentence={t("search.pageSkillzGraphs.title")}
      />
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
