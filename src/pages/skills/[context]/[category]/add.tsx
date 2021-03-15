import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import PageWithSkillList from "../../../../components/PageWithSkillList";
import SearchBar from "../../../../components/SearchBar";
import AddSkillListSelector from "../../../../components/AddSkilListSelector";
import { gql } from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import AddSkillModale from "../../../../components/AddSkillModale";

type Skill = {
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

const ADD_SKILL_MUTATION = gql`
  mutation addUserSkill(
    $email: String!
    $skillId: uuid!
    $level: Int!
    $desire: Int!
  ) {
    insert_UserSkill(
      objects: { skillId: $skillId, level: $level, userEmail: $email }
      on_conflict: { constraint: UserSkill_pkey, update_columns: created_at }
    ) {
      affected_rows
    }
    insert_TechnicalAppetite(
      objects: { skillId: $skillId, level: $desire, userEmail: $email }
      on_conflict: {
        constraint: TechnicalAppetite_pkey
        update_columns: created_at
      }
    ) {
      affected_rows
    }
  }
`;

const AddSkill = () => {
  const router = useRouter();
  const { user } = useAuth0();
  const { context, category } = router.query;
  const [search, setSearch] = useState("");
  const [modaleOpened, setModaleOpened] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>(
    undefined
  );
  const [debouncedSearchValue] = useDebounce(search, 500);
  const [addSkill, { data }] = useMutation(ADD_SKILL_MUTATION);
  const preAddAction = (skill: Skill) => {
    setSelectedSkill(skill);
    setModaleOpened(true);
  };

  const addAction = ({ id, name, level, desire }) => {
    setModaleOpened(false);
    addSkill({
      variables: {
        skillId: id,
        email: user?.email,
        level,
        desire,
      },
    });
  };

  const { data: skillsData } = useQuery<SkillSearchResult>(SKILL_SEARCH_QUERY, {
    variables: { category, search: `%${debouncedSearchValue}%` },
  });

  return (
    <PageWithSkillList
      context={context}
      category={category}
      add={true}
      faded={modaleOpened}
    >
      <div>
        <div
          className={`z-20 fixed inset-y-0 right-0 h-screen w-full ${
            modaleOpened ? "" : "hidden"
          }`}
        >
          <AddSkillModale
            skill={selectedSkill}
            cancel={() => setModaleOpened(false)}
            callback={addAction}
          />
        </div>
        <div
          className={`flex flex-col p-2 z-10 ${
            modaleOpened ? "opacity-25" : ""
          }`}
        >
          <SearchBar setSearch={setSearch} />
          <AddSkillListSelector
            action={preAddAction}
            skills={skillsData?.Skill}
          />
        </div>
      </div>
    </PageWithSkillList>
  );
};

export default withAuthenticationRequired(AddSkill);
