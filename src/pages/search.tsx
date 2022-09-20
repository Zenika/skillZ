import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import SearchBar from "../components/SearchBar";
import SkillPanel from "../components/SkillPanel";
import UserPanel from "../components/UserPanel";
import { SearchSkillsAndProfilesQuery, Skill } from "../generated/graphql";
import { SEARCH_SKILLS_AND_PROFILES_QUERY } from "../graphql/queries/skills";
import { i18nContext } from "../utils/i18nContext";
import CustomSelect from "../components/CustomSelect";

const Search = ({ pathName }) => {
  const { t } = useContext(i18nContext);

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  const choicesSorter = [
    { label: "trendsAsc", value: `${t("search.trends")}` },
    { label: "default", value: `${t("search.alphabetical")}` },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(choicesSorter[0]);

  const { data, error } = useQuery<SearchSkillsAndProfilesQuery>(
    SEARCH_SKILLS_AND_PROFILES_QUERY,
    {
      variables: { search: `%${search}%` },
    }
  );
  if (error) {
    console.error(error);
  }
  const skills = data?.skills;
  const profiles = data?.profiles;

  function onSelectSort(x) {
    setFilter(x);
  }

  const sortedSkills = () => {
    if (skills) {
      const xSkills = [...skills];
      switch (filter.label) {
        case "default":
          return skills;
        case "trendsAsc":
          return xSkills.sort(
            (a, b) =>
              Number(b.desireLevel + b.skillLevel) / 2 -
              Number(a.desireLevel + a.skillLevel) / 2
          );
        default:
          return skills;
      }
    } else {
      return skills;
    }
  };

  return (
    <>
      <div className="bg-light-med dark:bg-dark-dark">
        <PageWithNavAndPanel pathName={pathName} context={""}>
          <></>
        </PageWithNavAndPanel>
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
                <h1 className="text-xl mb-8">{t("search.skills")}</h1>
                <div style={{ width: `300px` }}>
                  <CustomSelect
                    labelFn={(x) => x.value}
                    keyFn={(x) => x.label}
                    choices={choicesSorter.filter(
                      ({ label }) => label !== filter.label
                    )}
                    placeholder={filter.value}
                    selectedChoice={filter}
                    onChange={(x) => onSelectSort(x)}
                  ></CustomSelect>
                </div>
              </div>
              {skills && sortedSkills().length > 0 ? (
                sortedSkills().map((skill) => (
                  <SkillPanel
                    key={skill.name}
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
                <h1 className="text-xl mb-8">{t("search.profiles")}</h1>
                {profiles?.length > 0 ? (
                  profiles.map((profile) => (
                    <UserPanel
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
                )}{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
