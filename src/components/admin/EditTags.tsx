import {
  SkillTagsBySkillQuery,
  GetAllTagsQuery,
  SearchAllTagsQuery,
  GetTagFromTagNameQuery,
} from "../../generated/graphql";
import {
  INSERT_SKILL_TO_TAG,
  DELETE_SKILL_TO_TAG,
} from "../../graphql/mutations/skills";
import {
  GET_SKILLTOPICS_BY_SKILL,
  GET_SKILLTAGS_BY_SKILL,
  GET_ALL_TAGS,
  GET_TAG_FROM_TAGNAME,
  SEARCH_IN_ALL_TAGS,
} from "../../graphql/queries/skills";
import { useMutation, useQuery } from "@apollo/client";
import { i18nContext } from "../../utils/i18nContext";
import Loading from "../Loading";
import React, { useContext, useState } from "react";
import { FetchedSkill, Tag } from "../../utils/types";
import Button from "../Button";
import AutoCompleteList from "../AutoCompleteList";
import { useEffect } from "react";
type EditTags = {
  skill: FetchedSkill;
};

const EditTags = ({ skill }: EditTags) => {
  const { t } = useContext(i18nContext);
  const [tagInput, setTagInput] = useState("");
  const [tagSelected, setTagSelected] = useState("");

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

  const { data: tagsByTagName, refetch: refetchTagFromName } =
    useQuery<GetTagFromTagNameQuery>(GET_TAG_FROM_TAGNAME, {
      variables: {
        tagName: tagSelected,
      },
    });
  const {
    data: allTags,
    refetch: refetchallTags,
    loading: loadingAllTags,
  } = useQuery<GetAllTagsQuery>(GET_ALL_TAGS);

  const { data: searchAllTags } = useQuery<SearchAllTagsQuery>(
    SEARCH_IN_ALL_TAGS,
    {
      fetchPolicy: "network-only",
      variables: {
        search: `%${tagInput}%`,
      },
    }
  );

  useEffect(() => {
    refetchTagFromName({
      variables: { tagName: tagSelected },
    });
  }, [tagSelected]);
  /*
   * MUTATIONS
   */
  const [insertTag] = useMutation(INSERT_SKILL_TO_TAG);
  const [deleteTag] = useMutation(DELETE_SKILL_TO_TAG);

  const addTag = (tagName: string) => {
    console.log("before", tagsByTagName);
    setTagSelected(tagName);
    console.log("after", tagsByTagName);
    insertTag({
      variables: { skillId: skill.id, tagId: tagsByTagName.Tag[0]?.id },
    }).then(() =>
      refetchTags({
        variables: { skillId: skill.id },
      })
    );
  };

  return (
    <div className="w-full">
      <p className="text-xl p-2">Tags</p>
      <div className="flex flex-rpw">
        {tagsBySkill &&
          tagsBySkill.SkillTag.map((tag) => {
            return (
              <div className="px-2">
                <Button
                  type={"primary"}
                  style={"contained"}
                  visible={true}
                  callback={() => console.log("clicked")}
                >
                  {tag.Tag.name}
                </Button>
              </div>
            );
          })}
      </div>
      {/* {allTags && console.log("allTags", searchAllTags)} */}
      <div className="w-full flex flex-col pt-4">
        <input
          className={`bg-light-light dark:bg-dark-light p-3 appearance-none rounded-lg border border-solid border-light-dark`}
          type="text"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
          }}
          placeholder="Add tags"
        ></input>
        {searchAllTags && (
          <AutoCompleteList
            choices={searchAllTags.Tag.map((tag) => tag.name) ?? []}
            placeholder={"Tags"}
            onChange={(tag) => addTag(tag)}
            search={tagInput}
            addCallback={(tag) => {
              console.log("tag add Callback", tag);
            }}
          />
        )}

        {/* {searchAllTags && tagInput.length > 0 && searchAllTags.Tag.length > 0 && (
          <ul id="autocomplete-tags">
            {searchAllTags.Tag.map((tag, index) => (
              <li
                key={index}
                className="hover:bg-light-med dark:hover:bg-dark-med py-2 px-4 cursor-pointer"
              >
                {tag.name}
              </li>
            ))}
          </ul>
        )} */}
      </div>
      <div></div>
    </div>
  );
};

export default EditTags;
