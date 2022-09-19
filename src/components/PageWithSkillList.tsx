import { useMutation, useQuery } from "@apollo/client";
import { User } from "@auth0/auth0-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDebounce } from "use-debounce";
import { SearchSkillsByCategoryQuery, Skill } from "../generated/graphql";
import { ADD_USER_SKILL_MUTATION } from "../graphql/mutations/skills";
import { DELETE_USER_SKILL_MUTATION } from "../graphql/mutations/userInfos";
import { SEARCH_SKILLS_BY_CATEGORY_QUERY } from "../graphql/queries/skills";
import { useFetchSkillsByContextCategoryAndAgency } from "../utils/fetchers/useFetchSkillsByContextCategoryAndAgency";
import { i18nContext } from "../utils/i18nContext";
import { FetchedSkill } from "../utils/types";
import { useComputeFilterUrl } from "../utils/useComputeFilterUrl";
import { useNotification } from "../utils/useNotification";
import AddOrEditSkillModal from "./AddOrEditSkillModal";
import AddSkillListSelector from "./AddSkilListSelector";
import FilterByPanel from "./FilterByPanel";
import Radar from "./Radar";
import SearchBar from "./SearchBar";
import SkillPanel from "./SkillPanel";

type PageWithSkillListProps = {
  user: User;
  context: string;
  agency: string;
  category: { name: string; id: string };
  setFadedPage?: Dispatch<SetStateAction<boolean>>;
};

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

const PageWithSkillList = ({
  user,
  context,
  agency,
  category,
  setFadedPage,
}: PageWithSkillListProps) => {
  /*
   * HOOKS
   */
  const { t } = useContext(i18nContext);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  const router = useRouter();

  /*
   * CONTEXT
   */
  const { add } = router.query;

  /*
   * STATES
   */
  const [editPanelOpened, setEditPanelOpened] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<FetchedSkill | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearchValue] = useDebounce(search, 500);

  /*
   * QUERIES
   */
  const {
    data: dataSearch,
    refetch: refetchSearch,
    loading: loadingSearch,
    error: errorSearch,
  } = useQuery<SearchSkillsByCategoryQuery>(SEARCH_SKILLS_BY_CATEGORY_QUERY, {
    variables: {
      category: category.name,
      search: `%${debouncedSearchValue}%`,
      email: user?.email,
      didYouMeanSearch: computeDidYouMeanSearchString(debouncedSearchValue),
    },
    fetchPolicy: "network-only",
  });

  const {
    skillsData,
    color,
    agencies,
    refetch: SkillsRefetch,
    loading: skillsLoading,
  } = useFetchSkillsByContextCategoryAndAgency(
    context,
    category.name,
    agency,
    user.email,
    debouncedSearchValue
  );

  /*
   * MUTATIONS
   */
  const [addSkill, { error: mutationError }] = useMutation(
    ADD_USER_SKILL_MUTATION
  );
  const [deleteSkill, { error: mutationDeleteError }] = useMutation(
    DELETE_USER_SKILL_MUTATION
  );

  const editSkillAction = ({ id, name, skillLevel, desireLevel, add }) => {
    if (add) {
      addSkill({
        variables: {
          skillId: id,
          email: user?.email,
          skillLevel,
          desireLevel,
        },
      })
        .then(() => {
          SkillsRefetch()
            .then(() => {
              useNotification(
                t("skills.updateSkillSuccess").replace("%skill%", name),
                "green",
                5000
              );
            })
            .catch(() =>
              useNotification(t("skills.refreshSkillFailed"), "red", 5000)
            );
        })
        .catch(() => {
          useNotification(
            t("skills.updateSkillFailed").replace("%skill%", name),
            "red",
            5000
          );
        });
    } else {
      deleteSkill({
        variables: {
          email: user?.email,
          skillId: id,
        },
      })
        .then(() => {
          SkillsRefetch()
            .then(() => {
              useNotification(
                t("skills.deleteSkillSuccess").replace("%skill%", name),
                "green",
                5000
              );
            })
            .catch(() =>
              useNotification(t("skills.refreshSkillFailed"), "red", 5000)
            );
        })
        .catch(() => {
          useNotification(t("skills.deleteSkillFailed"), "red", 5000);
        });
    }
  };

  /*
   * LISTENERS
   */
  const onModalClick = (skill: FetchedSkill) => {
    setSelectedSkill(skill);
    setEditPanelOpened(true);
    setFadedPage(true);
  };

  const onModalCancel = () => {
    setSelectedSkill(null);
    setEditPanelOpened(false);
    setFadedPage(false);
  };

  const filters =
    context !== "mine"
      ? [
          {
            name: "Agency",
            values: ["World", ...(agencies ?? [])],
            selected: agency ?? "World",
            callback: (value) =>
              router.push(
                useComputeFilterUrl(
                  `${window.location}`,
                  value ? [{ name: "agency", value: `${value}` }] : []
                )
              ),
          },
        ]
      : undefined;

  return (
    <div className="flex flex-row justify-center mt-4 mb-20">
      <div className="flex flex-row justify-center max-w-screen-xl w-full p-4">
        <div className="flex flex-col w-full">
          {filters && (
            <div className="mx-4">
              <FilterByPanel filters={filters} />
            </div>
          )}
          <div className="flex flex-row justify-center w-full">
            {isDesktop && (
              <div className="flex flex-col h-2/3 w-2/3 px-2">
                <Radar
                  data={
                    skillsData
                      ?.filter(
                        (skill) =>
                          (skill.skillLevel > 0 || skill.skillLevel) &&
                          (skill.desireLevel > 0 || skill.desireLevel)
                      )
                      .map((skill) => ({
                        x: skill.skillLevel,
                        y: skill.desireLevel,
                        weight: 65,
                        labels: [skill.name],
                        name: skill.name,
                      })) ?? []
                  }
                  color={color}
                  x="top"
                  y="left"
                  title=""
                  faded={editPanelOpened}
                />
              </div>
            )}
            <div
              className={`flex flex-col ${isDesktop ? "w-1/3" : "w-full"} px-2`}
            >
              {context !== "zenika" && (
                <>
                  <div
                    className={`flex flex-row justify-around px-2 py-1 ${
                      editPanelOpened ? "opacity-25" : ""
                    }`}
                  >
                    <Link href={`/skills/${context}/${category.name}`}>
                      <button
                        className={`${
                          add && context != "zenika"
                            ? `bg-light-light dark:bg-dark-light`
                            : `gradient-red`
                        } flex-grow-0 rounded-full mx-2 py-4 px-6 cursor-pointer`}
                      >
                        {t("skills.mySkills")}
                      </button>
                    </Link>
                    <Link
                      href={{
                        pathname: `/skills/${context}/${category.name}`,
                        query: { add: true },
                      }}
                    >
                      <button
                        className={`${
                          add && context != "zenika"
                            ? `gradient-red`
                            : `bg-light-light dark:bg-dark-light`
                        } flex-grow-0 rounded-full mx-2 py-4 px-6 cursor-pointer`}
                      >
                        {t("skills.addSkill")}
                      </button>
                    </Link>
                  </div>
                </>
              )}
              <div className="flex flex-col mt-6 max-w-screen-xl min-h-screen">
                {context != "zenika" && (
                  <SearchBar setSearch={setSearch} value={search} />
                )}
                {add && context != "zenika" && (
                  <div
                    className={`flex flex-col ${
                      isDesktop ? "h-radar" : ""
                    } p-2 z-10 ${editPanelOpened ? "opacity-25" : ""}`}
                  >
                    <AddSkillListSelector
                      action={onModalClick}
                      skills={
                        dataSearch?.Skill.filter(
                          (skill) =>
                            skill.UserSkillDesires_aggregate.aggregate.count ===
                            0
                        ) as Partial<Skill>[]
                      }
                      categoryId={category.id}
                      search={debouncedSearchValue}
                      didYouMeanSkills={
                        dataSearch?.didYouMeanSearch.filter(
                          (skill) =>
                            skill.UserSkillDesires_aggregate.aggregate.count ===
                            0
                        ) as Partial<Skill>[]
                      }
                    />
                  </div>
                )}
                {(!add || context === "zenika") && (
                  <div
                    className={`my-4 z-10 ${
                      editPanelOpened ? "cursor-pointer" : ""
                    } ${isDesktop ? "h-radar overflow-y-auto" : ""} ${
                      editPanelOpened ? "opacity-25" : ""
                    }`}
                    onClick={() =>
                      editPanelOpened ? onModalCancel() : () => {}
                    }
                  >
                    {skillsData?.length > 0 ? (
                      skillsData
                        ?.filter(
                          (skill) =>
                            (skill.skillLevel > 0 || skill.skillLevel) &&
                            (skill.desireLevel > 0 || skill.desireLevel)
                        )
                        .map((skill) => (
                          <SkillPanel
                            key={skill.name}
                            skill={skill}
                            count={skill.userCount || undefined}
                            context={context}
                            categoryLabel={category.name}
                            onEditClick={onModalClick}
                          />
                        ))
                    ) : (
                      <p>{t("skills.nothingHere")}</p>
                    )}
                  </div>
                )}
                <div
                  className={`z-20 fixed inset-y-0 right-0 h-screen w-full ${
                    editPanelOpened ? "" : "hidden"
                  }`}
                >
                  {selectedSkill && (
                    <div className="flex flex-row justify-center">
                      <AddOrEditSkillModal
                        skill={selectedSkill}
                        cancel={onModalCancel}
                        callback={(skill) => {
                          editSkillAction({
                            id: skill.id,
                            name: skill.name,
                            skillLevel: skill.skillLevel,
                            desireLevel: skill.desireLevel,
                            add: skill.add,
                          });
                          setEditPanelOpened(false);
                          setSelectedSkill(null);
                          setFadedPage(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWithSkillList;
