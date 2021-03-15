import React, { useContext } from "react";
import { useRouter } from "next/router";
import { i18nContext } from "../../../../utils/i18nContext";
import SkillPanel from "../../../../components/SkillPanel";
import PageWithSkillList from "../../../../components/PageWithSkillList";
import { gql } from "graphql-tag";
import { useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../../../components/Loading";

type Skill = {
  name: string;
  UserSkills: {
    level: number;
  }[];
  TechnicalAppetites: {
    level: number;
  }[];
};

const SKILLS_AND_APPETITE_QUERY = gql`
  query getSkillsAndTechnicalAppetitesByCategory(
    $email: String!
    $category: String!
  ) {
    Skill(
      where: {
        UserSkills: { userEmail: { _eq: $email } }
        _and: { Category: { label: { _eq: $category } } }
      }
    ) {
      name
      UserSkills(order_by: { created_at: desc }, limit: 1) {
        level
      }
      TechnicalAppetites(order_by: { created_at: desc }, limit: 1) {
        level
      }
    }
  }
`;

const ListSkills = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth0();
  const { t } = useContext(i18nContext);
  const { context, category } = router.query;

  const { data: skills } = useQuery<{ Skill: Skill[] }>(
    SKILLS_AND_APPETITE_QUERY,
    {
      variables: { email: user.email, category },
    }
  );
  if (isLoading || !skills) {
    return <Loading />;
  }

  return (
    <PageWithSkillList context={context} category={category} add={false}>
      {skills.Skill.length > 0 ? (
        skills.Skill.map((item) => (
          <SkillPanel
            key={item.name}
            name={item.name}
            level={item.UserSkills[0]?.level}
            desire={item.TechnicalAppetites[0]?.level}
            certif={false}
          />
        ))
      ) : (
        <p>No skill added yet</p>
      )}
    </PageWithSkillList>
  );
};

export default withAuthenticationRequired(ListSkills);
