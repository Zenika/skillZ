import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../../../../utils/i18nContext";
import SkillPanel from "../../../../components/SkillPanel";
import PageWithSkillList from "../../../../components/PageWithSkillList";
import { useMutation } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../../../components/Loading";
import AddOrEditSkillModal from "../../../../components/AddOrEditSkillModal";
import CommonPage from "../../../../components/CommonPage";
import { RadarData } from "../../../../components/Radar";
import { useNotification } from "../../../../utils/useNotification";
import { FetchedSkill, FilterData } from "../../../../utils/types";
import { useComputeFilterUrl } from "../../../../utils/useComputeFilterUrl";
import { useDarkMode } from "../../../../utils/darkMode";
import { ADD_USER_SKILL_MUTATION } from "../../../../graphql/mutations/skills";
import { useFetchSkillsByContextCategoryAndAgency } from "../../../../utils/fetchers/useFetchSkillsByContextCategoryAndAgency";
import { DELETE_USER_SKILL_MUTATION } from "../../../../graphql/mutations/userInfos";

const ListSkills = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth0();
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  let { context, category, agency } = router.query;
  context = context
    ? typeof context === "string"
      ? context
      : context.join("")
    : undefined;
  category = category
    ? typeof category === "string"
      ? category
      : category.join("")
    : undefined;
  agency = agency
    ? typeof agency === "string"
      ? agency
      : agency.join("")
    : undefined;
  const [editPanelOpened, setEditPanelOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<FetchedSkill>(undefined);
  const [categoryClicked, setCategoryClicked] = useState(undefined);
  const [filterByAgency, setFilterByAgency] = useState<
    FilterData<string> | undefined
  >(undefined);
  const [radarData, setRadarData] = useState<RadarData[]>([]);
  const { skillsData, color, agencies, refetch, loading } =
    useFetchSkillsByContextCategoryAndAgency(
      context,
      category,
      agency,
      user.email
    );
  useEffect(() => {
    setCategoryClicked(category);
  }),
    [category];
  useEffect(() => {
    if (!skillsData || skillsData.length <= 0) {
      setRadarData([]);
      return;
    }
    setRadarData(
      skillsData.map((skill) => ({
        x: skill.skillLevel,
        y: skill.desireLevel,
        weight: 65,
        labels: [skill.name],
        name: skill.name,
      }))
    );
    setFilterByAgency({
      name: "Agency",
      values: agencies || [],
      selected: agency
        ? typeof agency === "string"
          ? agency
          : agency.join("-")
        : "World",
    });
  }, [loading === false]);

  const [deleteSkill, { error: mutationDeleteError }] = useMutation(
    DELETE_USER_SKILL_MUTATION,
    {
      onCompleted: async () => {
        try {
          await refetch();
        } catch (err) {
          useNotification(`Error updating skill: ${err}`, "red", 5000);
        }
        useNotification(
          t("skills.deleteSkillSuccess").replace(
            "%skill%",
            selectedSkill?.name
          ),
          "green",
          5000
        );
        setModalOpened(false);
        setSelectedSkill(undefined);
      },
    }
  );
  const [addSkill, { error: mutationError }] = useMutation(
    ADD_USER_SKILL_MUTATION,
    {
      onCompleted: async () => {
        try {
          await refetch();
        } catch (err) {
          useNotification(`Error updating skill: ${err}`, "red", 5000);
        }
        useNotification(
          t("skills.updateSkillSuccess").replace(
            "%skill%",
            selectedSkill?.name
          ),
          "green",
          5000
        );
        setModalOpened(false);
        setSelectedSkill(undefined);
      },
    }
  );
  const onEditClick = (skill: FetchedSkill) => {
    setSelectedSkill(skill);
    openModal();
  };

  const onEditCancel = () => {
    setSelectedSkill(undefined);
    setEditPanelOpened(false);
  };

  const openModal = () => {
    setModalOpened(true);
    setEditPanelOpened(false);
  };

  const editAction = ({ id, name, skillLevel, desireLevel, add }) => {
    if (add) {
      addSkill({
        variables: {
          skillId: id,
          email: user?.email,
          skillLevel,
          desireLevel,
        },
      });
    } else {
      deleteSkill({
        variables: {
          email: user?.email,
          skillId: id,
        },
      });
      console.log("prout je voudrais delete");
    }
  };
  if (mutationError) {
    console.error("Error adding skill", mutationError);
  }
  if (mutationDeleteError) {
    console.error("Error deleting skill", mutationError);
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <CommonPage page={category} faded={modalOpened} context={context}>
      <PageWithSkillList
        context={context}
        category={category}
        add={false}
        filters={
          filterByAgency && context !== "mine"
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
        faded={editPanelOpened || modalOpened}
        data={radarData}
        color={color}
      >
        <div
          className={`z-10 ${modalOpened ? "cursor-pointer" : ""} ${
            isDesktop ? "h-radar overflow-y-auto" : ""
          } ${editPanelOpened || modalOpened ? "opacity-25" : ""}`}
          onClick={() => (editPanelOpened ? onEditCancel() : () => {})}
        >
          {skillsData?.length > 0 ? (
            skillsData?.map((skill) => (
              <SkillPanel
                key={skill.name}
                skill={skill}
                count={skill.userCount || undefined}
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
                onClick={() => openModal()}
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
            modalOpened ? "" : "hidden"
          }`}
        >
          {selectedSkill ? (
            <div className="flex flex-row justify-center">
              <AddOrEditSkillModal
                skill={selectedSkill}
                cancel={() => setModalOpened(false)}
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
