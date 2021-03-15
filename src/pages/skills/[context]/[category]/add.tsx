import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import PageWithSkillList from "../../../../components/PageWithSkillList";
import SearchBar from "../../../../components/SearchBar";
import AddSkillListSelector from "../../../../components/AddSkilListSelector";
import { gql } from "graphql-tag";
import { useQuery } from "@apollo/client";

export type Skill = {
  id: string;
  name: string;
};

type SkillSearchResult = {
  Skill: Skill[];
};

const SKILL_SEARCH_QUERY = gql`
  query getSkillsByCategory($search: String!, $category: String!) {
    Skill(
      where: {
        Category: { label: { _eq: $category } }
        name: { _ilike: $search }
      }
    ) {
      name
      id
    }
  }
`;

const AddSkill = () => {
  const router = useRouter();
  const { context, category } = router.query;
  const [search, setSearch] = useState("");
  const [debouncedSearchValue] = useDebounce(search, 500);

  const { data: skillsData } = useQuery<SkillSearchResult>(SKILL_SEARCH_QUERY, {
    variables: { category, search: `%${debouncedSearchValue}%` },
  });
  return (
    <PageWithSkillList context={context} category={category} add={true}>
      <div className="flex flex-col p-2">
        <SearchBar setSearch={setSearch} />
        <AddSkillListSelector skills={skillsData?.Skill} />
      </div>
    </PageWithSkillList>
  );
};

export default withAuthenticationRequired(AddSkill);
