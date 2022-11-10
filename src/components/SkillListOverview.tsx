import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import { useDebounce } from "use-debounce";
import { SearchSkillsByCategoryQuery, Skill } from "../generated/graphql";
import { ADD_USER_SKILL_MUTATION } from "../graphql/mutations/skills";
import { DELETE_USER_SKILL_MUTATION } from "../graphql/mutations/userInfos";
import { SEARCH_SKILLS_BY_CATEGORY_QUERY } from "../graphql/queries/skills";
import { computeFilterUrl } from "../utils/computeFilterUrl";
import { displayNotification } from "../utils/displayNotification";
import { useFetchSkillsByContextCategoryAndAgency } from "../utils/fetchers/useFetchSkillsByContextCategoryAndAgency";
import { i18nContext } from "../utils/i18nContext";
import { FetchedSkill } from "../utils/types";
import AddOrEditSkillModal from "./AddOrEditSkill";
import AddSkillListSelector from "./AddSkilListSelector";
import FilterByPanel from "./FilterByPanel";
import Modal from "./Modal";
import Radar from "./Radar";
import SearchBar from "./SearchBar";
import SkillPanel from "./SkillPanel";

type SkillListOverviewProps = {
  userEmail: string;
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

const SkillListOverview = ({
  userEmail,
  context,
  agency,
  category,
  setFadedPage,
}: SkillListOverviewProps) => {
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
  const [searchFilter, setSearchFilter] = useState("");
  const [debouncedSearchValue] = useDebounce(search, 500);
  const [debouncedSearchFilterValue] = useDebounce(searchFilter, 500);

  /*
   * QUERIES
   */
  const { data: dataSearch } = useQuery<SearchSkillsByCategoryQuery>(
    SEARCH_SKILLS_BY_CATEGORY_QUERY,
    {
      variables: {
        category: category.name,
        search: `%${debouncedSearchValue}%`,
        email: userEmail,
        didYouMeanSearch: computeDidYouMeanSearchString(debouncedSearchValue),
      },
      fetchPolicy: "network-only",
    }
  );

  const {
    skillsData,
    color,
    agencies,
    refetch: SkillsRefetch,
  } = useFetchSkillsByContextCategoryAndAgency(
    context,
    category.name,
    agency,
    userEmail,
    `%${debouncedSearchFilterValue}%`
  );

  /*
   * MUTATIONS
   */
  const [addSkill] = useMutation(ADD_USER_SKILL_MUTATION);
  const [deleteSkill] = useMutation(DELETE_USER_SKILL_MUTATION);

  const editSkillAction = ({ id, name, skillLevel, desireLevel, add }) => {
    if (add) {
      addSkill({
        variables: {
          skillId: id,
          email: userEmail,
          skillLevel,
          desireLevel,
        },
      })
        .then(() => {
          SkillsRefetch()
            .then(() => {
              displayNotification(
                t("skills.updateSkillSuccess").replace("%skill%", name),
                "green",
                5000
              );
            })
            .catch(() =>
              displayNotification(t("skills.refreshSkillFailed"), "red", 5000)
            );
        })
        .catch(() => {
          displayNotification(
            t("skills.updateSkillFailed").replace("%skill%", name),
            "red",
            5000
          );
        });
    } else {
      deleteSkill({
        variables: {
          email: userEmail,
          skillId: id,
        },
      })
        .then(() => {
          SkillsRefetch()
            .then(() => {
              displayNotification(
                t("skills.deleteSkillSuccess").replace("%skill%", name),
                "green",
                5000
              );
            })
            .catch(() =>
              displayNotification(t("skills.refreshSkillFailed"), "red", 5000)
            );
        })
        .catch(() => {
          displayNotification(t("skills.deleteSkillFailed"), "red", 5000);
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

  const filters =
    context === "zenika"
      ? [
          {
            name: "Agency",
            values: ["World", ...(agencies ?? [])],
            selected: agency ?? "World",
            callback: (value) =>
              router.push(
                computeFilterUrl(
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
            <div className="mx-4 mb-5">
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
              {context === "mine" && (
                <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px">
                    <li className="w-1/2 cursor-pointer">
                      <div
                        onClick={() =>
                          router.push({
                            pathname: `/skills/${context}/${category.name}`,
                          })
                        }
                        className={`w-full inline-block p-4 rounded-t-lg border-transparent dark:hover:bg-dark-dark hover:bg-light-dark ${
                          !add && "border-b-2 border-dark-red"
                        }`}
                      >
                        {t("skills.mySkills")}
                      </div>
                    </li>
                    <li className="w-1/2 cursor-pointer">
                      <div
                        onClick={() =>
                          router.push({
                            pathname: `/skills/${context}/${category.name}`,
                            search: "?add=true",
                          })
                        }
                        className={`w-full inline-block p-4 rounded-t-lg border-transparent dark:hover:bg-dark-dark hover:bg-light-dark ${
                          add && "border-b-2 border-dark-red"
                        }`}
                      >
                        {t("skills.addSkill")}
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              <div className="flex flex-col mt-6 max-w-screen-xl min-h-screen">
                <SearchBar
                  setSearch={add ? setSearch : setSearchFilter}
                  value={add ? search : searchFilter}
                />
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
                            {...(context === "mine" && {
                              onEditClick: onModalClick,
                            })}
                          />
                        ))
                    ) : (
                      <p>{t("skills.nothingHere")}</p>
                    )}
                  </div>
                )}
                {selectedSkill && editPanelOpened ? (
                  <Modal closeModal={() => setEditPanelOpened(false)}>
                    <AddOrEditSkillModal
                      skill={selectedSkill}
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
                  </Modal>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillListOverview;
