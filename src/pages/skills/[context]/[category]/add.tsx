import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import { useMediaQuery } from "react-responsive";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import PageWithSkillList from "../../../../components/PageWithSkillList";
import SearchBar from "../../../../components/SearchBar";
import AddSkillListSelector from "../../../../components/AddSkilListSelector";
import { useMutation, useQuery } from "@apollo/client";
import AddOrEditSkillModal from "../../../../components/AddOrEditSkillModal";
import CommonPage from "../../../../components/CommonPage";
import { useNotification } from "../../../../utils/useNotification";
import { i18nContext } from "../../../../utils/i18nContext";
import Custom404 from "../../../404";
import Loading from "../../../../components/Loading";
import {
  GetSkillsAndDesiresByCategoryQuery,
  SearchSkillsByCategoryQuery,
  Skill,
} from "../../../../generated/graphql";
import { ADD_USER_SKILL_MUTATION } from "../../../../graphql/mutations/skills";
import {
  GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
  SEARCH_SKILLS_BY_CATEGORY_QUERY,
} from "../../../../graphql/queries/skills";
import { FetchedSkill } from "../../../../utils/types";

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
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<FetchedSkill | undefined>(
    undefined
  );
  const {
    data,
    error: errorSkillsApetite,
    refetch,
    loading: loadingSkillsApetite,
  } = useQuery<GetSkillsAndDesiresByCategoryQuery>(
    GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
    {
      variables: { email: user.email, category: category || "" },
    }
  );
  const [debouncedSearchValue] = useDebounce(search, 500);
  const {
    data: skillsData,
    refetch: refetchSearch,
    loading: loadingSearchSkill,
    error: errorSearchSkills,
  } = useQuery<SearchSkillsByCategoryQuery>(SEARCH_SKILLS_BY_CATEGORY_QUERY, {
    variables: {
      category,
      search: `%${debouncedSearchValue}%`,
      email: user?.email,
      didYouMeanSearch: computeDidYouMeanSearchString(debouncedSearchValue),
    },
    fetchPolicy: "network-only",
  });
  const [addSkill, { error: mutationError }] = useMutation(
    ADD_USER_SKILL_MUTATION,
    {
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
    }
  );
  const preAddAction = (skill: FetchedSkill) => {
    setSelectedSkill(skill);
    setModalOpened(true);
  };

  const addAction = ({ id, name, skillLevel, desireLevel }) => {
    setModalOpened(false);
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
        <CommonPage page={category} faded={modalOpened} context={context}>
          <PageWithSkillList
            context={context}
            category={category}
            add={true}
            faded={modalOpened}
            data={radarData}
            color={data?.Category[0].color}
          >
            <div>
              <div
                className={`z-20 fixed inset-y-0 right-0 h-screen w-full ${
                  modalOpened ? "" : "hidden"
                }`}
              >
                {selectedSkill ? (
                  <div className="flex flex-row justify-center">
                    <AddOrEditSkillModal
                      skill={selectedSkill}
                      cancel={() => setModalOpened(false)}
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
                } p-2 z-10 ${modalOpened ? "opacity-25" : ""}`}
              >
                <SearchBar setSearch={setSearch} />
                <AddSkillListSelector
                  action={preAddAction}
                  skills={
                    skillsData?.Skill.filter(
                      (skill) =>
                        skill.UserSkillDesires_aggregate.aggregate.count === 0
                    ) as Partial<Skill>[]
                  }
                  categoryId={categoryId}
                  search={debouncedSearchValue}
                  didYouMeanSkills={
                    skillsData?.didYouMeanSearch.filter(
                      (skill) =>
                        skill.UserSkillDesires_aggregate.aggregate.count === 0
                    ) as Partial<Skill>[]
                  }
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
