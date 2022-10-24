import Link from "next/link";
import React, { useContext } from "react";
import CommonPage from "../components/CommonPage";
import { i18nContext } from "../utils/i18nContext";
import { gql, useQuery } from "@apollo/client";
import { useMediaQuery } from "react-responsive";
import NotificationPanel from "../components/NotificationPanel";
import { GetAllVerifiedSkillsQuery } from "../generated/graphql";
import { GET_ALL_VERIFIED_SKILL } from "../graphql/queries/skills";

export default function AdminPage() {
  const {
    data: skills,
    loading,
    error,
  } = useQuery<GetAllVerifiedSkillsQuery>(GET_ALL_VERIFIED_SKILL);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  const { t } = useContext(i18nContext);

  console.log("skills", skills);
  return (
    <CommonPage page={"Admin"} backBar={false}>
      <div className={"flex justify-center"}>
        <div className={`${isDesktop ? "w-2/3" : "w-full"}`}>
          <NotificationPanel></NotificationPanel>
        </div>
      </div>
    </CommonPage>
  );
}
