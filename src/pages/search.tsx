import { useQuery } from "@apollo/client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import CustomSelect from "../components/CustomSelect";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import SearchBar from "../components/SearchBar";
import SkillPanel from "../components/SkillPanel";
import UserPanel from "../components/UserPanel";
import { SearchSkillsAndProfilesQuery } from "../generated/graphql";
import { SEARCH_SKILLS_AND_PROFILES_QUERY } from "../graphql/queries/skills";
import { i18nContext } from "../utils/i18nContext";

const Search = ({ pathName }) => {
  const { t } = useContext(i18nContext);

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  const choicesSorter = [
    { label: "trendsAsc", value: `${t("search.trends")}` },
    { label: "default", value: `${t("search.alphabetical")}` },
    { label: "mostNoted", value: `${t("search.mostNoted")}` },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(choicesSorter[0]);
  const [skillsToDisplay, setSkillsToDisplay] = useState([]);

  const { data, error } = useQuery<SearchSkillsAndProfilesQuery>(
    SEARCH_SKILLS_AND_PROFILES_QUERY,
    {
      variables: { search: `%${search}%` },
    }
  );

  if (error) console.error(error);

  const skills = data?.skills;
  const profiles = data?.profiles;

  // MG_TRENDING_SKILL_LIMIT
  // Sort skills as Trends, Most noted, and Alphabetical order
  const sortedSkills = useCallback(() => {
    if (skills) {
      const xSkills = [...skills];
      switch (filter.label) {
        case "default":
          if (search === "") {
            return xSkills.slice(0, 10);
          }
          return skills;
        case "trendsAsc":
          if (search === "") {
            return xSkills
              .sort(
                (a, b) =>
                  Number(b.desireLevel + b.skillLevel) / 2 -
                  Number(a.desireLevel + a.skillLevel) / 2
              )
              .slice(0, 10);
          }
          return xSkills.sort(
            (a, b) =>
              Number(b.desireLevel + b.skillLevel) / 2 -
              Number(a.desireLevel + a.skillLevel) / 2
          );
        case "mostNoted":
          if (search === "") {
            return xSkills
              .sort((a, b) => b.userCount - a.userCount)
              .slice(0, 10);
          }
          return xSkills.sort((a, b) => b.userCount - a.userCount);
        default:
          return skills;
      }
    } else {
      return [];
    }
  }, [filter.label, search, skills]);

  useEffect(() => {
    setSkillsToDisplay(sortedSkills());
  }, [skills, filter, sortedSkills]);

  return (
    <PageWithNavAndPanel pathName={pathName} context={""}>
      <div className="w-full flex justify-center mb-8 ">
        <div className={`${isDesktop ? "w-2/3" : "w-full"} flex-col mx-4 `}>
          <SearchBar
            initialValue={search}
            value={search}
            setSearch={setSearch}
            placeholder={t("search.placeholder")}
          />
        </div>
      </div>
      <div className="flex w-full bg-light-ultrawhite dark:bg-dark-med justify-center">
        <div
          className={`flex ${
            isDesktop ? "w-2/3" : "w-full"
          } w-full flex-col mx-4 `}
        >
          <div className="flex flex-col my-8 py-2">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col mb-8">
                <h1 className="text-xl">{t("search.skills")}</h1>
                {skillsToDisplay.length > 0 && (
                  <p className="opacity-50">
                    {skillsToDisplay.length} {t("search.result")}
                  </p>
                )}
              </div>
              <div style={{ width: `300px` }}>
                <CustomSelect
                  labelFn={(x) => x.value}
                  keyFn={(x) => x.label}
                  choices={choicesSorter.filter(
                    ({ label }) => label !== filter.label
                  )}
                  placeholder={filter.value}
                  selectedChoice={filter}
                  onChange={(x) => setFilter(x)}
                ></CustomSelect>
              </div>
            </div>
            {skillsToDisplay.length > 0 ? (
              skillsToDisplay.map((skill) => (
                <SkillPanel
                  key={skill.name}
                  count={skill.userCount}
                  skill={skill}
                  categoryLabel={skill.Category?.label}
                  context={"zenika"}
                />
              ))
            ) : (
              <span className="text-sm">{t("search.noSkill")}</span>
            )}
          </div>
          {search && search !== "" && (
            <div className="flex flex-col my-2">
              <div className="flex flex-col mb-8">
                <h1 className="text-xl">{t("search.profiles")}</h1>
                {profiles?.length > 0 && (
                  <p className="opacity-50">
                    {profiles.length} {t("search.result")}
                  </p>
                )}
              </div>
              {profiles?.length > 0 ? (
                profiles.map((profile, index) => (
                  <UserPanel
                    key={index}
                    context=""
                    user={{
                      name: profile.name,
                      agency: profile.UserLatestAgency?.agency,
                      picture: profile.picture,
                      email: profile.email,
                    }}
                  />
                ))
              ) : (
                <span className="text-sm">{t("search.noProfile")}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </PageWithNavAndPanel>
  );
};

export default Search;
