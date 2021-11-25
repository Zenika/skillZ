import { gql, useQuery } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useContext } from "react";
import CommonPage from "../../../../../components/CommonPage";
import PageWithSkillList from "../../../../../components/PageWithSkillList";
import UserSkillPanel from "../../../../../components/UserSkillPanel";
import { GetUserSkillsAndTechnicalAppetitesQuery } from "../../../../../generated/graphql";
import {
  GET_USERS_SKILLS_AND_DESIRES_DETAIL_BY_AGENCY_QUERY,
  GET_USERS_SKILLS_AND_DESIRES_DETAIL_QUERY,
} from "../../../../../graphql/queries/skills";
import { i18nContext } from "../../../../../utils/i18nContext";

const SkillPage = () => {
  const router = useRouter();
  const { t } = useContext(i18nContext);
  const { context, category, skill, agency } = router.query;
  const computedAgency = agency
    ? typeof agency === "string"
      ? agency
      : agency.join("")
    : undefined;
  const { data: userSkillAndAppetiteDetails } =
    useQuery<GetUserSkillsAndTechnicalAppetitesQuery>(
      computedAgency
        ? GET_USERS_SKILLS_AND_DESIRES_DETAIL_BY_AGENCY_QUERY
        : GET_USERS_SKILLS_AND_DESIRES_DETAIL_QUERY,
      {
        variables: { category, skill, agency },
      }
    );
  const computedSkill = skill
    ? typeof skill === "string"
      ? skill
      : skill.join("")
    : "";
  const computedContext = context
    ? typeof context === "string"
      ? context
      : context.join("")
    : "";
  const fetchedSkill = userSkillAndAppetiteDetails?.Category[0]?.Skills[0];
  const computedData = fetchedSkill?.UsersCurrentSkillsAndDesires.map(
    (userSkillDesire) => ({
      id: fetchedSkill.id,
      name: fetchedSkill.name,
      level: userSkillDesire.skillLevel,
      desire: userSkillDesire.desireLevel,
      certif: false,
      user: {
        name: userSkillDesire.User.name,
        picture: userSkillDesire.User.picture,
        agency: userSkillDesire.User.UserLatestAgency?.agency,
        email: userSkillDesire.User.email,
      },
    })
  );
  return (
    <CommonPage
      page={skill}
      faded={false}
      context={context}
      category={category}
      skill={computedSkill}
    >
      <PageWithSkillList
        context={context}
        category={category}
        add={false}
        faded={false}
        color={userSkillAndAppetiteDetails?.Category[0]?.color}
      >
        <>
          {computedData?.map((data) => (
            <UserSkillPanel skill={data} context={computedContext} />
          ))}
        </>
      </PageWithSkillList>
    </CommonPage>
  );
};

export default withAuthenticationRequired(SkillPage);
