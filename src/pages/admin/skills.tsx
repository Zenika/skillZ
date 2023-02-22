import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDebounce } from "use-debounce";
import SearchBar from "../../components/atoms/SearchBar/SearchBar";
import Modal from "../../components/molecules/Modal";
import SkillAdminPanel from "../../components/molecules/SkillAdminPanel";
import EditSkillAdmin from "../../components/organisms/EditSkillAdmin";
import AdminPage from "../../components/templates/AdminPage";
import { GetAllVerifiedSkillsQuery } from "../../generated/graphql";
import { GET_ALL_VERIFIED_SKILL } from "../../graphql/queries/skills";
import { i18nContext } from "../../utils/i18nContext";
import { FetchedSkill } from "../../utils/types";

export default function AdminSkillsPage() {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  /*
   * AUTH
   */
  const { t } = useContext(i18nContext);

  /*
   * STATES
   */
  const [search, setSearch] = useState("");
  const [debouncedSearchValue] = useDebounce(search, 500);
  const [selectedSkill, setSelectedSkill] = useState<FetchedSkill | null>(null);

  const closeModal = () => {
    setSelectedSkill(null);
    refetch();
  };

  /*
   * QUERIES
   */
  const {
    data: skills,
    loading,
    refetch,
  } = useQuery<GetAllVerifiedSkillsQuery>(GET_ALL_VERIFIED_SKILL, {
    fetchPolicy: "network-only",
    variables: { search: `%${debouncedSearchValue}%` },
  });

  /*
   * LISTENERS
   */
  const onModalClick = (skill: FetchedSkill) => {
    setSelectedSkill(skill);
  };

  return (
    <AdminPage>
      <div className={`flex justify-center ${selectedSkill && "opacity-25"}`}>
        <div className={`${isDesktop ? "w-2/3" : "w-full"}`}>
          <SearchBar
            initialValue={search}
            value={search}
            setSearch={setSearch}
            placeholder={t("search.placeholder")}
          />
          {!loading && skills && skills.Skill && (
            <div>
              <div className="flex flex-col mb-5 mt-5 p-4">
                <h1 className="text-xl">{t("admin.skillsPending")}</h1>
                {skills?.Skill && (
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
                    <SkillAdminPanel
                      key={index}
                      skill={{
                        name: skill.name,
                        id: skill.id,
                        verified: skill.verified,
                      }}
                      approvedSkills={false}
                      onEditClick={() => onModalClick(skill)}
                    ></SkillAdminPanel>
                  )
                )}
              <div className="flex flex-col mb-5 mt-5 p-4">
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
                    <SkillAdminPanel
                      key={index}
                      skill={{
                        name: skill.name,
                        id: skill.id,
                        verified: skill.verified,
                      }}
                      approvedSkills={true}
                      onEditClick={() => onModalClick(skill)}
                    ></SkillAdminPanel>
                  )
                )}
            </div>
          )}
        </div>
      </div>
      {selectedSkill ? (
        <Modal closeModal={closeModal}>
          <EditSkillAdmin skillId={selectedSkill.id}></EditSkillAdmin>
        </Modal>
      ) : null}
    </AdminPage>
  );
}
