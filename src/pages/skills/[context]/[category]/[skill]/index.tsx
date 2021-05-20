import { gql, useQuery } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useContext } from "react";
import CommonPage from "../../../../../components/CommonPage";
import PageWithSkillList from "../../../../../components/PageWithSkillList";
import UserSkillPanel from "../../../../../components/UserSkillPanel";
import { i18nContext } from "../../../../../utils/i18nContext";

type UserSkillsAndAppetiteDetails = {
  Category: {
    color: string;
    Skills: {
      id: string;
      name: string;
      TechnicalAppetites: {
        level: number;
        User: {
          name: string;
          picture: string;
          UserAgencies: {
            agency: string;
          }[];
        };
      }[];
      UserSkills: {
        level: number;
        User: {
          name: string;
          picture: string;
          UserLatestAgency: {
            agency: string;
          };
        };
      }[];
    }[];
  }[];
};

const computeUsersSkillsAndTechnicalAppetitesDetail = ({
  agency,
}: {
  agency?: string;
}) => gql`
  query getUserSkillsAndTechnicalAppetitesDetail(
    $category: String!
    $skill: String!
    ${agency ? "$agency: String!" : ""}
  ) {
    Category(where: { label: { _eq: $category } }) {
      color
      Skills(where: { name: { _eq: $skill } ${
        agency
          ? ", UserSkills: {User: {UserLatestAgency: {agency: {_eq: $agency}}}}"
          : ""
      } }) {
        id
        name
        TechnicalAppetites(
          order_by: { userEmail: asc, created_at: desc }
          distinct_on: userEmail
          ${
            agency
              ? ", where: {User: {UserLatestAgency: {agency: {_eq: $agency}}}}"
              : ""
          }
        ) {
          level
          User {
            name
            picture
            UserLatestAgency {
              agency
            }
          }
        }
        UserSkills(
          order_by: { userEmail: asc, created_at: desc }
          distinct_on: userEmail
          ${
            agency
              ? ", where: {User: {UserLatestAgency: {agency: {_eq: $agency}}}}"
              : ""
          }
        ) {
          level
          User {
            name
            picture
            UserLatestAgency {
              agency
            }
          }
        }
      }
    }
  }
`;

const SkillPage = () => {
  const router = useRouter();
  const { t } = useContext(i18nContext);
  const { context, category, skill, agency } = router.query;
  const computedAgency = agency
    ? typeof agency === "string"
      ? agency
      : agency.join("")
    : undefined;
  const { data } = useQuery<UserSkillsAndAppetiteDetails>(
    computeUsersSkillsAndTechnicalAppetitesDetail({
      agency: computedAgency,
    }),
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
  const fetchedSkill = data?.Category[0]?.Skills[0];
  const computedData = fetchedSkill?.UserSkills.map((userSkill) => ({
    id: fetchedSkill.id,
    name: fetchedSkill.name,
    level: userSkill.level,
    desire: fetchedSkill.TechnicalAppetites.find(
      (item) => item.User.name === userSkill.User.name
    ).level,
    certif: false,
    user: {
      name: userSkill.User.name,
      picture: userSkill.User.picture,
      agency: userSkill.User.UserLatestAgency.agency,
    },
  }));
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
        color={data?.Category[0]?.color}
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
