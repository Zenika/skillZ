import React, { useState } from "react";
import { FetchedSkill } from "../../utils/types";
import { useMutation, useQuery } from "@apollo/client";
import {
  DeleteSkillMutation,
  GetAllSkillsQuery,
  MergeDuplicateSkillMutation,
} from "../../generated/graphql";
import { GET_ALL_SKILL } from "../../graphql/queries/skills";
import {
  DELETE_SKILL_MUTATION,
  MERGE_DUPLICATE_SKILL,
} from "../../graphql/mutations/skills";
import { useRouter } from "next/router";
import ErrorPage from "../templates/ErrorPage";
import Loading from "../molecules/Loading";
import { Autocomplete, TextField } from "@mui/material";
import Button from "../atoms/Button";
import { useI18n } from "../../providers/I18nProvider";
import { displayNotification } from "../../utils/displayNotification";

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
    context: {
      headers: {
        "x-hasura-role": "skillz-admins",
      },
    },
  });

  /*
   * MUTATIONS
   */
  const [mergeDuplicateSkill] = useMutation<MergeDuplicateSkillMutation>(
    MERGE_DUPLICATE_SKILL,
    {
      context: {
        headers: {
          "x-hasura-role": "skillz-admins",
        },
      },
    }
  );
  const [deleteSkill] = useMutation<DeleteSkillMutation>(
    DELETE_SKILL_MUTATION,
    {
      context: {
        headers: {
          "x-hasura-role": "skillz-admins",
        },
      },
    }
  );

  /*
   * CALLBACKS
   */
  const mergeDuplicateSkillButtonClick = async () => {
    mergeDuplicateSkill({
      variables: { skillId: skill.id, newSkillId: selectedDuplicate.id },
    })
      .catch(() => {})
      .finally(() => {
        deleteSkill({ variables: { skillId: skill.id } })
          .then(() => {
            router.reload();
          })
          .catch((e) => {
            console.log(e);
            displayNotification(`${t("error.unknown")}`, "red", 5000);
          });
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
