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
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

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
  const [filtersSection, setFiltersSection] = useState(false);
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
      {/*filter header*/}

      <div
        className={`${
          darkMode
            ? "flex flex-col justify-around bg-dark-dark p-2"
            : "flex flex-col justify-around bg-lidht-med p-2"
        }`}
      >
        <div className="flex flex-row items-center">
          <div className="p-2 text-xl">Filtres</div>
          {filtersSection ? (
            <IoIosArrowDropdownCircle
              size={20}
              onClick={() => setFiltersSection(false)}
            />
          ) : (
            <IoIosArrowDroprightCircle
              size={20}
              onClick={() => setFiltersSection(true)}
            />
          )}
        </div>
        {/*filter section*/}
        {filtersSection ? (
          <div className="flex flex-col">
            <div className="flex justify-center">
              Set desire level (at least)
            </div>
            <div className="flex items-center flex-row my-6 justify-center">
              <div className="px-4 flex">
                <AiFillMinusCircle
                  onClick={() => updateLevelFilter("desire", -1)}
                />
              </div>
              <LevelBar color="red" level={desireLevelSelector}></LevelBar>
              <div className="px-4 flex">
                <AiFillPlusCircle
                  onClick={() => updateLevelFilter("desire", 1)}
                />
              </div>
            </div>

            <div className="flex justify-center">Skill level (at least)</div>
            <div className="flex items-center flex-row my-6 justify-center">
              <div className="px-4 flex">
                <AiFillMinusCircle
                  onClick={() => updateLevelFilter("skill", -1)}
                />
              </div>
              <LevelBar color="yellow" level={skillLevelSelector}></LevelBar>
              <div className="px-4 flex">
                <AiFillPlusCircle
                  onClick={() => updateLevelFilter("skill", 1)}
                />
              </div>
            </div>
            <div className="flex justify-center p-2">
              <div className="flex justify-center p-2 px-4 gradient-red rounded-full text-white cursor-pointer w-1/5">
                OK
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/*end of filter section*/}
      <PageWithSkillList
        context={context}
        category={category}
        add={false}
        faded={false}
        color={color}
      >
        {data?.map((data) => (
          <UserSkillPanel
            skill={data}
            context={context as string}
            key={`key-${data.name}-${data.user}`}
          />
        ))}
      </PageWithSkillList>
    </CommonPage>
  );
};

export default withAuthenticationRequired(SkillPage);
