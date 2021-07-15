import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import PageWithNavAndPanel from "../components/PageWithNavAndPanel";
import SearchBar from "../components/SearchBar";
import SkillPanel from "../components/SkillPanel";
import UserSkillPanel from "../components/UserSkillPanel";
import { i18nContext } from "../utils/i18nContext";

const SEARCH_QUERY = gql`
  query searchSkillsAndProfiles($search: String!) {
    skills: ZenikasAverageCurrentSkillsAndDesires(
      where: { name: { _ilike: $search } }
      order_by: { name: asc }
    ) {
      name
      averageSkillLevel
      averageDesireLevel
    }
    profiles: UsersCurrentSkillsAndDesires(
      where: { name: { _ilike: $search } }
    ) {
      userEmail
      skillLevel
      desireLevel
      name
    }
  }
`;

const Search = ({ pathName }) => {
  const { query } = useRouter();
  const { t } = useContext(i18nContext);
  const [search, setSearch] = useState("");
  const { data, error } = useQuery(SEARCH_QUERY, {
    variables: { search: `%${search}%` },
  });
  if (error) {
    console.error(error);
  }
  const skills = data?.skills;
  const profiles = data?.profiles;
  return (
    <PageWithNavAndPanel pathName={pathName} context={""}>
      <div className="flex flex-auto flex-col mx-4">
        <SearchBar
          setSearch={setSearch}
          placeholder={t("search.placeholder")}
        />
        {search && search !== "" ? (
          <>
            <div className="flex flex-col border-b-2 my-2 py-2">
              <h1 className="text-xl">{t("search.skills")}</h1>
              {skills?.length > 0 ? (
                skills.map((skill) => <SkillPanel skill={skill} context={""} />)
              ) : (
                <span className="text-sm">{t("search.noSkill")}</span>
              )}
            </div>
            <div className="flex flex-col border-b-2 my-2">
              <h1 className="text-xl">{t("search.profiles")}</h1>
              {profiles?.length > 0 ? (
                profiles.map((profile) => (
                  <UserSkillPanel
                    context=""
                    skill={
                      {
                        name: profile.name,
                        id: profile.skillId,
                        level: profile.level,
                        desire: profile.desire,
                      } as any
                    }
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
    </PageWithNavAndPanel>
  );
};

export default Search;
