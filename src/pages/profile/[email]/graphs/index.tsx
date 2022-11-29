import { useQuery } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CommonPage from "../../../../components/CommonPage";
import ErrorPage from "../../../../components/ErrorPage";
import HomePanel from "../../../../components/HomePanel";
import Loading from "../../../../components/Loading";
import UserInfosTopBar from "../../../../components/UserInfosTopBar";
import {
  GetCurrentUserSkillsAndDesiresQuery,
  GetUserQuery,
} from "../../../../generated/graphql";
import {
  GET_USER_CURRRENT_SKILLS_AND_DESIRES_QUERY,
  GET_USER_QUERY,
} from "../../../../graphql/queries/userInfos";
import { i18nContext } from "../../../../utils/i18nContext";
import Custom404 from "../../../404";

const HomePanelByUser = () => {
  const { query } = useRouter();
  const { t } = useContext(i18nContext);

  /*
   * STATES
   */
  const [userInfos, setUserInfos] = useState(null);

  /*
   * QUERIES
   */
  const {
    data: userInfosDatas,
    error: errorUserInfosDatas,
    loading: loadingUserInfosDatas,
  } = useQuery<GetUserQuery>(GET_USER_QUERY, {
    variables: { email: query?.email },
    fetchPolicy: "network-only",
  });

  const {
    data: skillsData,
    error: errorSkillsData,
    loading: loadingSkillsDatas,
  } = useQuery<GetCurrentUserSkillsAndDesiresQuery>(
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
    description: data.description,
    count: data.CurrentSkillsAndDesires_aggregate.aggregate.count,
    context: `${query.email}`,
    data: data.CurrentSkillsAndDesires.map((skill) => ({
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
    if (userInfosDatas) setUserInfos(userInfosDatas.User[0]);
  }, [userInfosDatas]);

  if (loadingUserInfosDatas || loadingSkillsDatas) {
    return <Loading />;
  } else if (errorUserInfosDatas || errorSkillsData) {
    return <ErrorPage />;
  } else if (!userInfos) {
    return <Custom404 />;
  }

  return (
    <CommonPage page={userInfos.email} backBar={false}>
      <UserInfosTopBar
        userEmail={userInfos?.email}
        userName={userInfos?.name}
        userPicture={userInfos?.picture}
        sentence={t("search.pageSkillzGraphs.title")}
      />
      <div className="flex flex-row mx-4 flex-wrap mb-20">
        {homePanelData &&
          homePanelData.map((computedDataSkill) => (
            <HomePanel
              props={computedDataSkill}
              key={`home-panel-${computedDataSkill.name}`}
            />
          ))}
      </div>
    </CommonPage>
  );
};

export default withAuthenticationRequired(HomePanelByUser, {
  loginOptions: { prompt: "login" },
});
