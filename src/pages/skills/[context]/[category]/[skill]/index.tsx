import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import CommonPage from "../../../../../components/CommonPage";
import PageWithSkillList from "../../../../../components/PageWithSkillList";
import UserSkillPanel from "../../../../../components/UserSkillPanel";
import { useFetchUsersForSkill } from "../../../../../utils/fetchers/useFetchUsersForSkill";
import { useNotification } from "../../../../../utils/useNotification";
import LevelBar from "../../../../../components/LevelBar";
import { useState } from "react";
import Image from "next/image";
import logoLess from "../../../../../../public/icons/light/minus.png";
import { useDarkMode } from "../../../../../utils/darkMode";

const SkillPage = () => {
  const router = useRouter();
  let { context, category, skill, agency } = router.query;
  agency = agency
    ? typeof agency === "string"
      ? agency
      : agency.join("")
    : undefined;
  skill = skill
    ? typeof skill === "string"
      ? skill
      : skill.join("")
    : undefined;
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
  const { data, color, loading, error } = useFetchUsersForSkill(
    category,
    skill,
    agency
  );
  const [desireLevelSelector, setDesireLevelSelector] = useState(0);
  const [skillLevelSelector, setSkillLevelSelector] = useState(0);
  const { darkMode } = useDarkMode();
  function updateLevelFilter(levelCategory, i) {
    if (levelCategory === "desire")
      setDesireLevelSelector(desireLevelSelector + i);
    if (levelCategory === "skill")
      setSkillLevelSelector(skillLevelSelector + i);
    if (desireLevelSelector < 1) setDesireLevelSelector(1);
    if (skillLevelSelector < 1) setSkillLevelSelector(1);
    if (desireLevelSelector > 5) setDesireLevelSelector(5);
    if (skillLevelSelector > 5) setSkillLevelSelector(5);
  }
  if (error) {
    useNotification(`Error: ${error.message}`, "red", 5000);
  }
  return (
    <CommonPage
      page={skill}
      faded={false}
      context={context}
      category={category}
      skill={skill}
    >
      {/*filter section*/}
      <div className="flex justify-center">
        <div className="flex flex-col justify-center w-1/2 my-6 bg-light-light dark:bg-dark-dark">
          <div className="flex justify-center"> Apply filters</div>
          <div className="flex items-center flex-row my-6 justify-center">
            <div className="px-4 flex">
              <Image
                src={`/icons/${darkMode ? "dark" : "light"}/add-skill.svg`}
                width="28"
                height="28"
                onClick={() => updateLevelFilter("desire", -1)}
              />
            </div>
            <div className="">
              <LevelBar color="red" level={desireLevelSelector}></LevelBar>
            </div>
            <div className="px-4 flex">
              <Image
                src={`/icons/${darkMode ? "dark" : "light"}/add-skill.svg`}
                width="28"
                height="28"
                onClick={() => updateLevelFilter("desire", 1)}
              />
            </div>
          </div>
          <div className="flex flex-row my-6 justify-center">
            <LevelBar color="yellow" level={4}></LevelBar>
          </div>

          <div className="flex justify-center p-2 px-4 gradient-red rounded-full text-white cursor-pointer">
            OK
          </div>
        </div>
      </div>
      {/*end of filter section*/}
      <PageWithSkillList
        context={context}
        category={category}
        add={false}
        faded={false}
        color={color}
      >
        <>
          {data?.map((data) => (
            <UserSkillPanel
              skill={data}
              context={context as string}
              key={`key-${data.name}-${data.user}`}
            />
          ))}
        </>
      </PageWithSkillList>
    </CommonPage>
  );
};

export default withAuthenticationRequired(SkillPage);
