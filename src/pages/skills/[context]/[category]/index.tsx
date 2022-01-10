import { useRouter } from "next/router";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../../../components/Loading";
import { DisplayMySkills } from "../../../../components/SkillsDisplayByCategoryAndContext/DisplayMySkills";
import { DisplayZenikasSkillsFilteredByAgency } from "../../../../components/SkillsDisplayByCategoryAndContext/DisplayZenikasSkillsFilteredByAgency";
import { DisplayZenikasSkills } from "../../../../components/SkillsDisplayByCategoryAndContext/DisplayZenikasSkills";
import { useEffect, useState } from "react";

const ListSkills = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth0();
  const { context, category, agency } = router.query;
  const [props, setProps] = useState<{
    context?: string;
    category?: string;
    agency?: string;
  }>({});
  useEffect(
    () =>
      setProps({
        context: context
          ? typeof context === "string"
            ? context
            : context.join("")
          : undefined,
        category: category
          ? typeof category === "string"
            ? category
            : category.join("")
          : undefined,
        agency: agency
          ? typeof agency === "string"
            ? agency
            : agency.join("")
          : undefined,
      }),
    [context, category, agency]
  );
  return isLoading ? (
    <Loading />
  ) : props.context === "mine" ? (
    <DisplayMySkills category={props.category} email={user.email} />
  ) : props.context === "zenika" ? (
    !agency || agency === "" || agency === "world" ? (
      <DisplayZenikasSkills category={props.category} />
    ) : (
      <DisplayZenikasSkillsFilteredByAgency
        agency={props.agency}
        category={props.category}
      />
    )
  ) : (
    <>Error</>
  );
};

export default withAuthenticationRequired(ListSkills);
