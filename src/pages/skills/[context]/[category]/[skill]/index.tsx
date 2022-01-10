import { gql, useQuery } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import CommonPage from "../../../../../components/CommonPage";
import PageWithSkillList from "../../../../../components/PageWithSkillList";
import UserSkillPanel from "../../../../../components/UserSkillPanel";
import { useFetchUsersForSkill } from "../../../../../utils/fetchers/useFetchUsersForSkill";
import { useNotification } from "../../../../../utils/useNotification";

const SkillPage = () => {
  const router = useRouter();
  let { context, category, skill, agency } = router.query;
  agency = agency
    ? typeof agency === "string"
      ? agency
      : agency.join("")
    : undefined;
  skill = skill
    ? typeof skill === "string"
      ? skill
      : skill.join("")
    : undefined;
  context = context
    ? typeof context === "string"
      ? context
      : context.join("")
    : undefined;
  category = category
    ? typeof category === "string"
      ? category
      : category.join("")
    : undefined;
  const { data, color, loading, error } = useFetchUsersForSkill(
    category,
    skill,
    agency
  );
  if (error) {
    useNotification(`Error: ${error.message}`, "red", 5000);
  }
  return (
    <CommonPage
      page={skill}
      faded={false}
      context={context}
      category={category}
      skill={skill}
    >
      <PageWithSkillList
        context={context}
        category={category}
        add={false}
        faded={false}
        color={color}
      >
        <>
          {data?.map((data) => (
            <UserSkillPanel skill={data} context={context as string} />
          ))}
        </>
      </PageWithSkillList>
    </CommonPage>
  );
};

export default withAuthenticationRequired(SkillPage);
