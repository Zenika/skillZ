import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../../utils/i18nContext";
import SkillPanel from "../../components/SkillPanel";
import PageWithSkillList from "../../components/PageWithSkillList";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../components/Loading";
import AddOrEditSkillModale from "../../components/AddOrEditSkillModale";
import CommonPage from "../../components/CommonPage";
import { RadarData } from "../../components/Radar";
import { useNotification } from "../../utils/useNotification";
import { FilterData } from "../../utils/types";
import { useComputeFilterUrl } from "../../utils/useComputeFilterUrl";
import { useDarkMode } from "../../utils/darkMode";
import { ADD_USER_SKILL_MUTATION } from "../../graphql/mutations/skills";
import {
  GET_AGENCIES_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
  GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
  GET_ZENIKA_AVERAGE_CURRENT_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
} from "../../graphql/queries/skills";
import {
  AgenciesAverageCurrentSkillsAndDesires,
  Category,
  GetAgenciesAverageCurrentSkillsAndDesiresByCategoryQuery,
  GetSkillsAndDesiresByCategoryQuery,
  GetZenikaAverageCurrentSkillsAndDesiresByCategoryQuery,
  Maybe,
  Skill,
  UsersCurrentSkillsAndDesires,
  ZenikasAverageCurrentSkillsAndDesires,
} from "../../generated/graphql";

type DisplayMySkillsProps = { email: string; category: string };

export const DisplayMySkills = ({ email, category }: DisplayMySkillsProps) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  const [editPanelOpened, setEditPanelOpened] = useState(false);
  const [modaleOpened, setModaleOpened] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(undefined);
  const [categoryClicked, setCategoryClicked] = useState(undefined);
  const { data, refetch, loading } =
    useQuery<GetSkillsAndDesiresByCategoryQuery>(
      GET_SKILLS_AND_DESIRES_BY_CATEGORY_QUERY,
      {
        variables: {
          email,
          category,
        },
      }
    );
  useEffect(() => {
    setCategoryClicked(category);
  });

  const radarData = data?.Category[0]?.CurrentSkillsAndDesires?.map(
    (skill) => ({
      x: skill.skillLevel,
      y: skill.desireLevel,
      weight: 65,
      labels: [skill.name],
      name: skill.name,
    })
  );

  const sortedSkills = data?.Category[0]?.CurrentSkillsAndDesires?.map(
    (skill: UsersCurrentSkillsAndDesires) => ({
      id: skill.skillId,
      name: skill.name,
      skillLevel: skill.skillLevel,
      desireLevel: skill.desireLevel,
    })
  );

  const [addSkill] = useMutation(ADD_USER_SKILL_MUTATION, {
    onCompleted: async () => {
      useNotification(
        t("skills.updateSkillSuccess").replace("%skill%", selectedSkill?.name),
        "green",
        5000
      );
      setModaleOpened(false);
      setSelectedSkill(undefined);
    },
  });
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
        email,
        skillLevel,
        desireLevel,
      },
    }).then(
      () => {
        refetch({
          email,
          category,
        });
      },
      (reason) =>
        useNotification(`Error updating skill: ${reason}`, "red", 5000)
    );
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <CommonPage page={category} faded={modaleOpened} context={"mine"}>
      <PageWithSkillList
        context={"mine"}
        category={category}
        add={false}
        faded={editPanelOpened || modaleOpened}
        data={radarData}
        color={data?.Category[0]?.color}
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
                context={"mine"}
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
