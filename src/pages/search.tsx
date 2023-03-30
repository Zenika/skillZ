import { useQuery } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDebounce } from "use-debounce";
import CustomSelect from "../components/atoms/CustomSelect/CustomSelect";
import SearchBar from "../components/atoms/SearchBar/SearchBar";
import UserPanel from "../components/molecules/UserPanel";
import CertificationPanel from "../components/organisms/CertificationPanel";
import SkillPanel from "../components/organisms/SkillPanel";
import CommonPage from "../components/templates/CommonPage";
import ErrorPage from "../components/templates/ErrorPage";
import { SearchSkillsProfilesCertificationsQuery } from "../generated/graphql";
import { SEARCH_SKILLS_PROFILES_CERTIFICATIONS_QUERY } from "../graphql/queries/skills";
import { useI18n } from "../providers/I18nProvider";

const Search = () => {
  /*
   * HOOKS
   */
  const { t } = useI18n();
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  const router = useRouter();

  const choicesSorter = [
    { label: "trendsAsc", value: `${t("search.trends")}` },
    { label: "default", value: `${t("search.alphabetical")}` },
    { label: "mostNoted", value: `${t("search.mostNoted")}` },
  ];

  /*
   * STATES
   */
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(choicesSorter[0]);
  const [debouncedSearchValue] = useDebounce(search, 500);
  const [skillsToDisplay, setSkillsToDisplay] = useState([]);

  /*
   * QUERIES
   */
  const { data, error } = useQuery<SearchSkillsProfilesCertificationsQuery>(
    SEARCH_SKILLS_PROFILES_CERTIFICATIONS_QUERY,
    {
      variables: { search: `%${debouncedSearchValue}%` },
    }
  );

  const skills = data?.skills;
  const profiles = data?.profiles;
  const certifications = data?.certificatons;

  // MG_TRENDING_SKILL_LIMIT
  // Sort skills as Trends, Most noted, and Alphabetical order
  const sortedSkills = useCallback(() => {
    if (skills) {
      const xSkills = [...skills];
      switch (filter.label) {
        case "default":
          if (debouncedSearchValue === "") {
            return xSkills.slice(0, 10);
          }
          return skills;
        case "trendsAsc":
          if (debouncedSearchValue === "") {
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
          if (debouncedSearchValue === "") {
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
  }, [filter.label, debouncedSearchValue, skills]);

  useEffect(() => {
    setSkillsToDisplay(sortedSkills());
  }, [skills, filter, sortedSkills]);

  useEffect(() => {
    if (router.query.skill) {
      setSearch(router.query.skill.toString());
    }
  }, [router]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <CommonPage page={"search"} backBar={true}>
      <div className={"flex justify-center mb-20"}>
        <div className={`${isDesktop ? "w-2/3" : "w-full"}`}>
          <SearchBar
            initialValue={search}
            value={search}
            setSearch={setSearch}
          />
          <div className="flex flex-row justify-between mt-10">
            <div className="flex flex-col mb-8">
              <h1 className="text-xl">{t("search.skills")}</h1>
              {skillsToDisplay.length > 0 && (
                <p className="opacity-50">
                  {skillsToDisplay.length} {t("search.result")}
                </p>
              )}
            </div>
            <div className={"w-80"}>
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
          <div className={"mt-5"}>
            {skillsToDisplay.length > 0 ? (
              skillsToDisplay.map((skill) => (
                <SkillPanel
                  key={skill.name}
                  count={skill.userCount}
                  skill={skill}
                  categoryLabel={skill.Category?.label}
                  context={"search"}
                />
              ))
            ) : (
              <span className="text-sm">{t("search.noSkill")}</span>
            )}
          </div>
          {debouncedSearchValue && debouncedSearchValue.length && (
            <>
              <div className={"mt-20"}>
                <div>
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
              </div>
              <div className={"mt-20"}>
                <div>
                  <div className="flex flex-col mb-8">
                    <h1 className="text-xl">{t("search.certifications")}</h1>
                    {certifications?.length > 0 && (
                      <p className="opacity-50">
                        {certifications.length} {t("search.result")}
                      </p>
                    )}
                  </div>
                  {certifications?.length > 0 ? (
                    certifications.map((certification, index) => (
                      <CertificationPanel
                        certification={certification}
                        key={index}
                      />
                    ))
                  ) : (
                    <span className="text-sm">
                      {t("search.noCertification")}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </CommonPage>
  );
};

export default withAuthenticationRequired(Search);
