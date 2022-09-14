import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDebounce } from "use-debounce";
import { SearchSkillsByCategoryQuery, Skill } from "../generated/graphql";
import { SEARCH_SKILLS_BY_CATEGORY_QUERY } from "../graphql/queries/skills";
import { i18nContext } from "../utils/i18nContext";
import { FetchedSkill } from "../utils/types";
import { useNotification } from "../utils/useNotification";
import AddOrEditSkillModal from "./AddOrEditSkillModal";
import AddSkillListSelector from "./AddSkilListSelector";
import FilterByPanel, { Filter } from "./FilterByPanel";
import Radar from "./Radar";
import SearchBar from "./SearchBar";
import SkillPanel from "./SkillPanel";

type PageWithSkillListProps = {
  category: { name: string; id: string };
  context: string | string[];
  editSkillAction: ({ id, name, skillLevel, desireLevel, add }) => void;
  filters?: Filter[];
  data?: FetchedSkill[];
  color?: string;
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
  category,
  context,
  editSkillAction,
  filters,
  data,
  color,
  setFadedPage,
}: PageWithSkillListProps) => {
  /*
   * HOOKS
   */
  const { t } = useContext(i18nContext);
  const { user } = useAuth0();
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
            {isDesktop && data && color && (
              <div className="flex flex-col h-2/3 w-2/3 px-2">
                <Radar
                  data={data?.map((skill) => ({
                    x: skill.skillLevel,
                    y: skill.desireLevel,
                    weight: 65,
                    labels: [skill.name],
                    name: skill.name,
                  }))}
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
              )}
              <div className="flex flex-col mt-6 max-w-screen-xl min-h-screen">
                {add && context != "zenika" && (
                  <div
                    className={`flex flex-col ${
                      isDesktop ? "h-radar" : ""
                    } p-2 z-10 ${editPanelOpened ? "opacity-25" : ""}`}
                  >
                    <SearchBar setSearch={setSearch} />
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
                    className={`z-10 ${
                      editPanelOpened ? "cursor-pointer" : ""
                    } ${isDesktop ? "h-radar overflow-y-auto" : ""} ${
                      editPanelOpened ? "opacity-25" : ""
                    }`}
                    onClick={() =>
                      editPanelOpened ? onModalCancel() : () => {}
                    }
                  >
                    {data?.length > 0 ? (
                      data?.map((skill) => (
                        <SkillPanel
                          key={skill.name}
                          skill={skill}
                          count={skill.userCount || undefined}
                          context={
                            typeof context === "string"
                              ? context
                              : context.join("")
                          }
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
                          refetchSearch()
                            .then()
                            .catch(() =>
                              useNotification(
                                t("skills.refreshSkillFailed"),
                                "red",
                                5000
                              )
                            );
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
