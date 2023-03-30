import React, { useState } from "react";
import { FetchedSkill } from "../../utils/types";
import { useMutation, useQuery } from "@apollo/client";
import {
  GetAllSkillsQuery,
  MergeDuplicateSkillMutation,
} from "../../generated/graphql";
import { GET_ALL_SKILL } from "../../graphql/queries/skills";
import { MERGE_DUPLICATE_SKILL } from "../../graphql/mutations/skills";
import { displayNotification } from "../../utils/displayNotification";
import { useRouter } from "next/router";
import ErrorPage from "../templates/ErrorPage";
import Loading from "../molecules/Loading";
import { Autocomplete, TextField } from "@mui/material";
import Button from "../atoms/Button";
import { useI18n } from "../../providers/I18nProvider";

type DuplicateSkillAdminProps = {
  skill: FetchedSkill;
};

const DuplicateSkillAdmin = ({ skill }: DuplicateSkillAdminProps) => {
  const { t } = useI18n();
  const router = useRouter();

  const [selectedDuplicate, setSelectedDuplicate] =
    useState<FetchedSkill>(null);

  /*
   * QUERIES
   */
  const { data, error, loading } = useQuery<GetAllSkillsQuery>(GET_ALL_SKILL, {
    variables: { search: `%%` },
  });

  /*
   * MUTATIONS
   */
  const [mergeDuplicateSkill] = useMutation<MergeDuplicateSkillMutation>(
    MERGE_DUPLICATE_SKILL
  );

  /*
   * CALLBACKS
   */
  const mergeDuplicateSkillButtonClick = async () => {
    await mergeDuplicateSkill({
      variables: { skillId: skill.id, newSkillId: selectedDuplicate.id },
    })
      .then(() => {
        router.reload();
      })
      .catch((e) => {
        console.log(e);
        displayNotification(`${t("error.unknown")}`, "red", 5000);
      });
  };

  if (loading) return <Loading></Loading>;

  if (error) return <ErrorPage></ErrorPage>;

  return (
    <div className="flex flex-col p-2">
      <div className="flex border-b">
        <h2 className="my-4 text-xl">{`${t(
          "admin.markSkillAsDuplicate"
        ).replace("%s", skill.name)}`}</h2>
      </div>
      <Autocomplete
        options={data?.Skill.filter((s) => s.id != skill.id) ?? []}
        renderInput={(params) => <TextField {...params} label="Skill" />}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => {
          setSelectedDuplicate(value);
        }}
        className={"my-4"}
      />
      <Button
        type="primary"
        disabled={selectedDuplicate === null}
        callback={mergeDuplicateSkillButtonClick}
      >
        {t("admin.markAsDuplicate")}
      </Button>
    </div>
  );
};

export default DuplicateSkillAdmin;
