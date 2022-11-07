import React, { useContext, useState } from "react";
import CommonPage from "../components/CommonPage";
import { i18nContext } from "../utils/i18nContext";
import { useQuery } from "@apollo/client";
import { useMediaQuery } from "react-responsive";
import NotificationPanel from "../components/NotificationPanel";
import { GetAllVerifiedSkillsQuery } from "../generated/graphql";
import { GET_ALL_VERIFIED_SKILL } from "../graphql/queries/skills";
import Loading from "../components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { config } from "../env";
import { useEffect } from "react";
import Custom404 from "./404";
import SearchBar from "../components/SearchBar";

export default function AdminPage() {
  /*
   * STATES
   */
  const [search, setSearch] = useState("");
  const [authorize, setAuthorize] = useState(false);

  /*
   * QUERIES
   */

  const { data: skills, loading } = useQuery<GetAllVerifiedSkillsQuery>(
    GET_ALL_VERIFIED_SKILL,
    {
      fetchPolicy: "network-only",
      variables: { search: `%${search}%` },
    }
  );

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  /*
   * HOOKS
   */

  const { t } = useContext(i18nContext);
  const { user } = useAuth0();

  useEffect(() => {
    if (
      user.email ===
      config.nextPublicAdmins.split(";").find((admin) => admin === user.email)
    ) {
      setAuthorize(true);
    }
  }, [user]);

  if (authorize == false) return <Custom404 />;

  return (
    <CommonPage page={"Admin"} backBar={false}>
      <div className={"flex justify-center"}>
        <div className={`${isDesktop ? "w-2/3" : "w-full"}`}>
          <SearchBar
            initialValue={search}
            value={search}
            setSearch={setSearch}
            placeholder={t("search.placeholder")}
          />
          {!loading && (
            <div>
              <div className="flex flex-col mb-8 mt-10">
                <h1 className="text-xl">{t("admin.skillsPending")}</h1>
                {skills.Skill && (
                  <p className="opacity-50">
                    {
                      skills.Skill.filter((field) => field.verified === false)
                        .length
                    }{" "}
                    {t("search.result")}
                  </p>
                )}
              </div>
              {skills.Skill.length > 0 &&
                skills.Skill.filter((field) => field.verified == false).map(
                  (skill, index) => (
                    <NotificationPanel
                      key={index}
                      skill={{
                        name: skill.name,
                        skillId: skill.id,
                        verified: skill.verified,
                      }}
                      approvedSkills={false}
                    ></NotificationPanel>
                  )
                )}
              <div className="flex flex-col mb-8 mt-10">
                <h1 className="text-xl">{t("admin.skillList")}</h1>
                <p className="opacity-50">
                  {
                    skills.Skill.filter((field) => field.verified == true)
                      .length
                  }{" "}
                  {t("search.result")}
                </p>
              </div>
              {skills.Skill.length > 0 &&
                skills.Skill.filter((field) => field.verified == true).map(
                  (skill, index) => (
                    <NotificationPanel
                      key={index}
                      skill={{
                        name: skill.name,
                        skillId: skill.id,
                        verified: skill.verified,
                      }}
                      approvedSkills={true}
                    ></NotificationPanel>
                  )
                )}
            </div>
          )}
        </div>
      </div>
    </CommonPage>
  );
}
