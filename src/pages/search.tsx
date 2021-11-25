import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import SearchBar from "../components/SearchBar";
import SkillPanel from "../components/SkillPanel";
import UserPanel from "../components/UserPanel";
import { SearchSkillsAndProfilesQuery } from "../generated/graphql";
import { SEARCH_SKILLS_AND_PROFILES_QUERY } from "../graphql/queries/skills";
import { i18nContext } from "../utils/i18nContext";

const Search = ({ pathName }) => {
  const { query } = useRouter();

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  const { t } = useContext(i18nContext);
  const [search, setSearch] = useState("");

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

  return (
    <PageWithNavAndPanel pathName={pathName} context={""}>
      <div className="flex justify-center mb-16">
        <div
          className={`flex ${isDesktop ? "w-2/3" : "w-full"}  flex-col mx-4 `}
        >
          <SearchBar
            initialValue={search}
            setSearch={setSearch}
            placeholder={t("search.placeholder")}
          />
          {search && search !== "" ? (
            <>
              <div className="flex flex-col my-2 py-2">
                <h1 className="text-xl">{t("search.skills")}</h1>
                {skills?.length > 0 ? (
                  skills.map((skill) => (
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
              <div className="flex flex-col my-2">
                <h1 className="text-xl">{t("search.profiles")}</h1>
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
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </PageWithNavAndPanel>
  );
};

export default Search;
