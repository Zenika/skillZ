import Link from "next/link";
import React, { useContext } from "react";
import CommonPage from "../components/CommonPage";
import { i18nContext } from "../utils/i18nContext";
import { gql, useQuery } from "@apollo/client";
import { useMediaQuery } from "react-responsive";
import NotificationPanel from "../components/NotificationPanel";
import { GetAllVerifiedSkillsQuery } from "../generated/graphql";
import { GET_ALL_VERIFIED_SKILL } from "../graphql/queries/skills";
import Loading from "../components/Loading";

export default function AdminPage() {
  const {
    data: skills,
    loading,
    error,
  } = useQuery<GetAllVerifiedSkillsQuery>(GET_ALL_VERIFIED_SKILL, {
    fetchPolicy: "network-only",
  });
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  const { t } = useContext(i18nContext);

  if (loading) return <Loading></Loading>;

  return (
    <CommonPage page={"Admin"} backBar={false}>
      <div className={"flex justify-center"}>
        <div className={`${isDesktop ? "w-2/3" : "w-full"}`}>
          {skills &&
            skills.Skill.map((skill, index) => (
              <NotificationPanel
                key={index}
                skill={{
                  name: skill.name,
                  verified: skill.verified,
                }}
              ></NotificationPanel>
            ))}
        </div>
      </div>
    </CommonPage>
  );
}
