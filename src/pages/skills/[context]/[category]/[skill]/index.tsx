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
      UserSkillDesires: {
        skillLevel: number;
        desireLevel: number;
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
          ? ", UserSkillDesires: {User: {UserLatestAgency: {agency: {_eq: $agency}}}}"
          : ""
      } }) {
        id
        name
        UserSkillDesires(
          order_by: { userEmail: asc, created_at: desc }
          distinct_on: userEmail
          ${
            agency
              ? ", where: {User: {UserLatestAgency: {agency: {_eq: $agency}}}}"
              : ""
          }
        ) {
          skillLevel
          desireLevel
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
  const computedData = fetchedSkill?.UserSkillDesires.map(
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
