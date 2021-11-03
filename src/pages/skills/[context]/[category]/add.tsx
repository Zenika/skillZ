import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import { useMediaQuery } from "react-responsive";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import PageWithSkillList from "../../../../components/PageWithSkillList";
import SearchBar from "../../../../components/SearchBar";
import AddSkillListSelector from "../../../../components/AddSkilListSelector";
import { gql } from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import AddOrEditSkillModale from "../../../../components/AddOrEditSkillModale";
import { FetchResult } from ".";
import CommonPage from "../../../../components/CommonPage";
import { useNotification } from "../../../../utils/useNotification";
import { i18nContext } from "../../../../utils/i18nContext";
import Custom404 from "../../../404";
import Loading from "../../../../components/Loading";

type Skill = {
  id: string;
  name: string;
  UserSkillDesires_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

type SkillSearchResult = {
  Skill: Skill[];
  didYouMeanSearch: Skill[];
};

const SKILLS_AND_APPETITE_QUERY = gql`
  query getSkillsAndTechnicalAppetitesByCategory(
    $email: String!
    $category: String!
  ) {
    Category(where: { label: { _eq: $category } }) {
      color
      id
      CurrentSkillsAndDesires(
        order_by: { skillLevel: desc, desireLevel: desc }
        where: { userEmail: { _eq: $email } }
      ) {
        id: skillId
        name
        desireLevel
        skillLevel
      }
    }
    Agency {
      name
    }
  }
`;

const SKILL_SEARCH_QUERY = gql`
  query getSkillsByCategory(
    $search: String!
    $category: String!
    $email: String!
    $didYouMeanSearch: String!
  ) {
    Skill(
      where: {
        Category: { label: { _eq: $category } }
        name: { _ilike: $search }
      }
      order_by: { name: asc }
    ) {
      name
      id
      UserSkillDesires_aggregate(where: { User: { email: { _eq: $email } } }) {
        aggregate {
          count
        }
      }
    }
    didYouMeanSearch: Skill(
      where: {
        Category: { label: { _eq: $category } }
        name: { _similar: $didYouMeanSearch }
      }
    ) {
      name
      id
      UserSkillDesires_aggregate(where: { User: { email: { _eq: $email } } }) {
        aggregate {
          count
        }
      }
    }
  }
`;

const ADD_SKILL_MUTATION = gql`
  mutation addUserSkill(
    $email: String!
    $skillId: uuid!
    $skillLevel: Int!
    $desireLevel: Int!
  ) {
    insert_UserSkillDesire(
      objects: {
        skillId: $skillId
        skillLevel: $skillLevel
        desireLevel: $desireLevel
        userEmail: $email
      }
      on_conflict: {
        constraint: UserSkillDesire_userEmail_skillId_created_at_key
        update_columns: [skillLevel, desireLevel]
      }
    ) {
      affected_rows
    }
  }
`;

const computeDidYouMeanSearchString = (search: string) => {
  const searches: string[] = [];
  for (let i = 0; i < Math.floor(search.length / 2); ++i) {
    const subString = search.substring(i * 2, i * 2 + 2);
    searches.push(`${subString[0].toLowerCase()}${subString[1].toLowerCase()}`);
    searches.push(`${subString[0].toUpperCase()}${subString[1].toLowerCase()}`);
    searches.push(`${subString[0].toLowerCase()}${subString[1].toUpperCase()}`);
    searches.push(`${subString[0].toUpperCase()}${subString[1].toUpperCase()}`);
  }
  return `%(${searches.join("|")})%`;
};

const AddSkill = () => {
  const router = useRouter();
  const { user } = useAuth0();
  const { t } = useContext(i18nContext);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  const { context, category } = router.query;
  if (context === "zenika") {
    router.push(`/skills/${context}/${category}`);
  }
  const [search, setSearch] = useState("");
  const [modaleOpened, setModaleOpened] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>(
    undefined
  );
  const {
    data,
    error: errorSkillsApetite,
    refetch,
    loading: loadingSkillsApetite,
  } = useQuery<FetchResult>(SKILLS_AND_APPETITE_QUERY, {
    variables: { email: user.email, category: category || "" },
    fetchPolicy: "network-only",
  });
  const [debouncedSearchValue] = useDebounce(search, 500);
  const {
    data: skillsData,
    refetch: refetchSearch,
    loading: loadingSearchSkill,
    error: errorSearchSkills,
  } = useQuery<SkillSearchResult>(SKILL_SEARCH_QUERY, {
    variables: {
      category,
      search: `%${debouncedSearchValue}%`,
      email: user?.email,
      didYouMeanSearch: computeDidYouMeanSearchString(debouncedSearchValue),
    },
    fetchPolicy: "network-only",
  });
  const [addSkill, { error: mutationError }] = useMutation(ADD_SKILL_MUTATION, {
    onCompleted: (_) => {
      useNotification(
        t("skills.addSkillSuccess").replace("%skill%", selectedSkill?.name),
        "green",
        5000
      );
      setSelectedSkill(undefined);
      refetchSearch({ category, search: `%${debouncedSearchValue}%` });
      refetch({
        category,
        search: `%${debouncedSearchValue}%`,
        email: user?.email,
      });
    },
  });
  const preAddAction = (skill: Skill) => {
    setSelectedSkill(skill);
    setModaleOpened(true);
  };

  const addAction = ({ id, name, skillLevel, desireLevel }) => {
    setModaleOpened(false);
    addSkill({
      variables: {
        skillId: id,
        email: user?.email,
        skillLevel,
        desireLevel,
      },
    });
  };

  if (mutationError) {
    console.error("Error adding skill", mutationError);
  }
  const radarData = data?.Category[0]?.CurrentSkillsAndDesires?.map(
    (skill) => ({
      x: skill.skillLevel,
      y: skill.desireLevel,
      weight: 65,
      labels: [skill.name],
      name: skill.name,
    })
  );
  const categoryId = data?.Category[0]?.["id"];
  return (
    <div>
      {radarData && !errorSkillsApetite && !errorSearchSkills ? (
        <CommonPage page={category} faded={modaleOpened} context={context}>
          <PageWithSkillList
            context={context}
            category={category}
            add={true}
            faded={modaleOpened}
            data={radarData}
            color={data?.Category[0].color}
          >
            <div>
              <div
                className={`z-20 fixed inset-y-0 right-0 h-screen w-full ${
                  modaleOpened ? "" : "hidden"
                }`}
              >
                {selectedSkill ? (
                  <div className="flex flex-row justify-center">
                    <AddOrEditSkillModale
                      skill={selectedSkill}
                      cancel={() => setModaleOpened(false)}
                      callback={addAction}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                className={`flex flex-col ${
                  isDesktop ? "h-radar" : ""
                } p-2 z-10 ${modaleOpened ? "opacity-25" : ""}`}
              >
                <SearchBar setSearch={setSearch} />
                <AddSkillListSelector
                  action={preAddAction}
                  skills={skillsData?.Skill.filter(
                    (skill) =>
                      skill.UserSkillDesires_aggregate.aggregate.count === 0
                  )}
                  categoryId={categoryId}
                  search={debouncedSearchValue}
                  didYouMeanSkills={skillsData?.didYouMeanSearch.filter(
                    (skill) =>
                      skill.UserSkillDesires_aggregate.aggregate.count === 0
                  )}
                />
              </div>
            </div>
          </PageWithSkillList>
        </CommonPage>
      ) : loadingSkillsApetite && loadingSearchSkill ? (
        <Loading />
      ) : (
        <Custom404 />
      )}
    </div>
  );
};

export default withAuthenticationRequired(AddSkill);
