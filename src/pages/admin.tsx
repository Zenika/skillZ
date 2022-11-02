import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import EditSkillAdminModal from "../components/admin/EditSkillAdminModal";
import CommonPage from "../components/CommonPage";
import NotificationPanel from "../components/NotificationPanel";
import SearchBar from "../components/SearchBar";
import { config } from "../env";
import { GetAllVerifiedSkillsQuery } from "../generated/graphql";
import { GET_ALL_VERIFIED_SKILL } from "../graphql/queries/skills";
import { i18nContext } from "../utils/i18nContext";
import { FetchedSkill } from "../utils/types";
import Custom404 from "./404";

export default function AdminPage() {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  /*
   * AUTH
   */
  const { user } = useAuth0();
  const { t } = useContext(i18nContext);

  /*
   * STATES
   */
  const [authorize, setAuthorize] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<FetchedSkill | null>(null);

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

  /*
   * LISTENERS
   */
  const onModalClick = (skill: FetchedSkill) => {
    setSelectedSkill(skill);
  };

  const onModalClose = () => {
    setSelectedSkill(null);
  };

  /*
   * HOOKS
   */
  useEffect(() => {
    if (
      user.email ===
      config.nextPublicAdmins.split(";").find((admin) => admin === user.email)
    ) {
      setAuthorize(true);
    }
  }, [user]);

  if (authorize === false) return <Custom404 />;

  return (
    <CommonPage page={"Admin"} backBar={false} faded={true}>
      <div className={`flex justify-center ${selectedSkill && "opacity-25"}`}>
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
                skills.Skill.filter((field) => field.verified === false).map(
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
                  {skills.Skill.length} {t("search.result")}
                </p>
              </div>
              {skills.Skill.length > 0 &&
                skills.Skill.filter((field) => field.verified === true).map(
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
      {selectedSkill && (
        <div className="flex flex-row justify-center">
          <EditSkillAdminModal
            skill={selectedSkill}
            cancel={onModalClose}
            callback={onModalClose}
          ></EditSkillAdminModal>
        </div>
      )}
    </CommonPage>
  );
}
