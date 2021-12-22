import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../../../../utils/i18nContext";
import SkillPanel from "../../../../components/SkillPanel";
import PageWithSkillList from "../../../../components/PageWithSkillList";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../../../components/Loading";
import AddOrEditSkillModale from "../../../../components/AddOrEditSkillModale";
import CommonPage from "../../../../components/CommonPage";
import { RadarData } from "../../../../components/Radar";
import { useNotification } from "../../../../utils/useNotification";
import { FilterData } from "../../../../utils/types";
import { useComputeFilterUrl } from "../../../../utils/useComputeFilterUrl";
import { useDarkMode } from "../../../../utils/darkMode";
import { ADD_USER_SKILL_MUTATION } from "../../../../graphql/mutations/skills";
import {
  GET_AGENCIES_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
  GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
  GET_ZENIKA_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
} from "../../../../graphql/queries/skills";
import {
  AgenciesAverageCurrentSkillsAndDesires,
  Category,
  GetAgenciesAverageCurrentSkillsAndDesiresByCategoryQuery,
  GetSkillsAndDesiresByCategoryQuery,
  GetZenikaAverageCurrentSkillsAndDesiresByCategoryQuery,
  Maybe,
  Skill,
  ZenikasAverageCurrentSkillsAndDesires,
} from "../../../../generated/graphql";

// export type FetchResult = {
//   Category: FetchedCategory[];
//   Agency: {
//     name: string;
//   }[];
// };

// export type FetchedCategory = {
//   color: string;
//   CurrentSkillsAndDesires: FetchedSkill[];
// };
// export type FetchedSkill = {
//   id: string;
//   name: string;
//   skillLevel: number;
//   desireLevel: number;
//   userCount: number;
// };

const ListSkills = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth0();
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  const { context, category, agency } = router.query;
  const [editPanelOpened, setEditPanelOpened] = useState(false);
  const [modaleOpened, setModaleOpened] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(undefined);
  const [categoryClicked, setCategoryClicked] = useState(undefined);
  const [filterByAgency, setFilterByAgency] = useState<
    FilterData<string> | undefined
  >(undefined);
  const { categoryData, agencyData, refetch } = (() => {
    if (context !== "zenika") {
      const { data, refetch } = useQuery<GetSkillsAndDesiresByCategoryQuery>(
        GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
        {
          variables: {
            email: user.email,
            category: category || "",
          },
          fetchPolicy: "network-only",
        }
      );
      return {
        agencyData: data?.Agency,
        categoryData: {
          color: data?.Category[0]?.color,
          CurrentSkillsAndDesires:
            data?.Category[0]?.CurrentSkillsAndDesires.map((value) => ({
              ...value,
              __typename: undefined,
            })) || [],
        },
        refetch,
      };
    }
    if (!filterByAgency?.selected) {
      const { data, refetch } =
        useQuery<GetZenikaAverageCurrentSkillsAndDesiresByCategoryQuery>(
          GET_ZENIKA_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
          {
            variables: {
              category: category || "",
            },
            fetchPolicy: "network-only",
          }
        );
      return {
        agencyData: data?.Agency,
        categoryData: {
          color: data?.Category[0].color,
          CurrentSkillsAndDesires:
            data?.Category[0].ZenikasAverageCurrentSkillsAndDesires.map(
              (value) => ({ ...value, __typename: undefined })
            ) || [],
        },
        refetch,
      };
    }
    const { data, refetch } =
      useQuery<GetAgenciesAverageCurrentSkillsAndDesiresByCategoryQuery>(
        GET_AGENCIES_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
        {
          variables: {
            category: category || "",
            agency: filterByAgency?.selected,
          },
          fetchPolicy: "network-only",
        }
      );
    return {
      agencyData: data?.Agency,
      categoryData: {
        color: data?.Category[0].color,
        CurrentSkillsAndDesires:
          data?.Category[0].AgenciesAverageCurrentSkillsAndDesires.map(
            (value) => ({ ...value, __typename: undefined })
          ) || [],
      },
      refetch,
    };
  })();
  useEffect(() => {
    setCategoryClicked(category);
  });

  useEffect(
    () =>
      setFilterByAgency(
        agency
          ? {
              name: "Agency",
              values: agencyData.map((agency) => agency.name) || [],
              selected: typeof agency === "string" ? agency : agency.join("-"),
            }
          : undefined
      ),
    [agency, categoryData]
  );

  const radarData = categoryData?.CurrentSkillsAndDesires.map((skill) => ({
    x: skill.skillLevel,
    y: skill.desireLevel,
    weight: 65,
    labels: [skill.name],
    name: skill.name,
  }));

  const sortedSkills = categoryData.CurrentSkillsAndDesires.map(
    (
      skill:
        | ZenikasAverageCurrentSkillsAndDesires
        | AgenciesAverageCurrentSkillsAndDesires
    ) => ({
      id: skill.skillId,
      name: skill.name,
      count: skill.userCount,
      skillLevel: skill.averageSkillLevel,
      desire: skill.averageDesireLevel,
    })
  );
  if (!filterByAgency && context !== "mine" && agencyData) {
    setFilterByAgency({
      values: agencyData.map((agency) => agency.name),
      name: "Agency",
    });
  }

  const [addSkill, { error: mutationError }] = useMutation(
    ADD_USER_SKILL_MUTATION,
    {
      onCompleted: async () => {
        useNotification(
          t("skills.updateSkillSuccess").replace(
            "%skill%",
            selectedSkill?.name
          ),
          "green",
          5000
        );
        setModaleOpened(false);
        setSelectedSkill(undefined);
      },
    }
  );
  const onEditClick = (skill: Skill) => {
    setSelectedSkill(skill);
    openModale();
    // setEditPanelOpened(true);
  };

  const onEditCancel = () => {
    setSelectedSkill(undefined);
    setEditPanelOpened(false);
  };

  const openModale = () => {
    setModaleOpened(true);
    setEditPanelOpened(false);
  };

  const editAction = ({ id, name, skillLevel, desireLevel }) => {
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
  if (isLoading) {
    return <Loading />;
  }
  return (
    <CommonPage page={category} faded={modaleOpened} context={context}>
      <PageWithSkillList
        context={context}
        category={category}
        add={false}
        filters={
          filterByAgency
            ? [
                {
                  name: filterByAgency.name,
                  values: ["World", ...filterByAgency.values],
                  selected: filterByAgency.selected,
                  callback: (value) =>
                    router.push(
                      useComputeFilterUrl(
                        `${window.location}`,
                        value ? [{ name: "agency", value: `${value}` }] : []
                      )
                    ),
                },
              ]
            : undefined
        }
        faded={editPanelOpened || modaleOpened}
        data={radarData}
        color={categoryData.color}
      >
        <div
          className={`z-10 ${modaleOpened ? "cursor-pointer" : ""} ${
            isDesktop ? "h-radar overflow-y-auto" : ""
          } ${editPanelOpened || modaleOpened ? "opacity-25" : ""}`}
          onClick={() => (editPanelOpened ? onEditCancel() : () => {})}
        >
          {sortedSkills?.length > 0 ? (
            sortedSkills?.map((skill) => (
              <SkillPanel
                key={skill.name}
                skill={skill}
                count={
                  skill?.count
                }
                context={
                  typeof context === "string" ? context : context.join("")
                }
                categoryLabel={categoryClicked}
                onEditClick={onEditClick}
              />
            ))
          ) : (
            <p>{t("skills.nothingHere")}</p>
          )}
        </div>
        <div
          className={`fixed inset-x-0 duration-500 z-20 bottom-0 h-${
            editPanelOpened ? "2/6" : "0"
          } w-8/10 bg-light-light dark:bg-dark-light mx-2 rounded`}
        >
          <div className={`flex flex-col py-6 px-4 justify-between`}>
            <h1 className="text-xl text-bold">{selectedSkill?.name}</h1>
            <div className="flex flex-col h-full mt-8 justify-around ml-2">
              <button
                className="flex flex-row flex-start p-1 my-2"
                onClick={() => openModale()}
              >
                <Image
                  src={`/icons/${darkMode ? "dark" : "light"}/preferences.svg`}
                  width="24"
                  height="24"
                />
                <span className="px-2">{t("skills.editSkill")}</span>
              </button>
              <button
                className="flex flex-row flex-start p-1 my-2"
                onClick={() => onEditCancel()}
              >
                <Image
                  src={`/icons/${darkMode ? "dark" : "light"}/back-arrow.svg`}
                  width="16"
                  height="16"
                />
                <span className="px-4">{t("skills.cancelAction")}</span>
              </button>
            </div>
          </div>
        </div>
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
                callback={editAction}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </PageWithSkillList>
    </CommonPage>
  );
};

export default withAuthenticationRequired(ListSkills);
