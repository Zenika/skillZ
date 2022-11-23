import {
  SkillTagsBySkillQuery,
  GetAllTagsQuery,
} from "../../generated/graphql";
import {
  INSERT_SKILL_TO_TAG,
  DELETE_SKILL_TO_TAG,
} from "../../graphql/mutations/skills";
import {
  GET_SKILLTOPICS_BY_SKILL,
  GET_SKILLTAGS_BY_SKILL,
  GET_ALL_TAGS,
} from "../../graphql/queries/skills";
import { useMutation, useQuery } from "@apollo/client";
import { i18nContext } from "../../utils/i18nContext";
import Loading from "../Loading";
import React, { useContext, useState } from "react";
import { FetchedSkill } from "../../utils/types";
import Button from "../Button";

type EditTags = {
  skill: FetchedSkill;
};

const EditTags = ({ skill }: EditTags) => {
  const { t } = useContext(i18nContext);
  const [tagInput, setTagInput] = useState("");

  /*
   * QUERIES
   */
  const {
    data: tagsBySkill,
    refetch: refetchTags,
    loading: loadingTagsBySkill,
  } = useQuery<SkillTagsBySkillQuery>(GET_SKILLTAGS_BY_SKILL, {
    variables: {
      skillId: skill?.id,
    },
  });

  const {
    data: allTags,
    refetch: refetchallTags,
    loading: loadingAllTags,
  } = useQuery<GetAllTagsQuery>(GET_ALL_TAGS);

  /*
   * MUTATIONS
   */
  const [insertTag] = useMutation(INSERT_SKILL_TO_TAG);
  const [deleteTag] = useMutation(DELETE_SKILL_TO_TAG);

  return (
    <div className="w-full">
      {tagsBySkill &&
        tagsBySkill.SkillTag.map((tag) => {
          return (
            <Button
              type={"primary"}
              style={"contained"}
              visible={true}
              callback={() => console.log("clicked")}
            >
              {tag.tagId + ""}
            </Button>
          );
        })}
      {allTags && console.log("allTags", allTags.Tag)}
      <div className="w-full flex flex-col">
        <input
          className={`bg-light-light dark:bg-dark-light p-3 appearance-none rounded-lg border border-solid border-light-dark`}
          type="text"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
          }}
          placeholder="Add tags"
        ></input>
        {allTags && allTags.Tag.length > 0 && (
          <ul id="autocomplete-tags">
            {allTags.Tag.map((tag, index) => (
              <li key={index}>{tag.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default EditTags;
