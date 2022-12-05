import {
  SkillTagsBySkillQuery,
  SearchAllTagsQuery,
  GetTagFromTagNameQuery,
} from "../../generated/graphql";
import {
  INSERT_SKILL_TO_TAG,
  DELETE_SKILL_TO_TAG,
} from "../../graphql/mutations/skills";
import {
  GET_SKILLTAGS_BY_SKILL,
  GET_TAG_FROM_TAGNAME,
  SEARCH_IN_ALL_TAGS,
} from "../../graphql/queries/skills";
import { useMutation, useQuery } from "@apollo/client";
import { i18nContext } from "../../utils/i18nContext";
import Loading from "../Loading";
import React, { useContext, useState } from "react";
import { FetchedSkill, SkillTag } from "../../utils/types";
import AutoCompleteList from "../AutoCompleteList";
import { useEffect } from "react";
import Chip from "../Chip";
type EditTags = {
  skill: FetchedSkill;
};

const EditTags = ({ skill }: EditTags) => {
  const { t } = useContext(i18nContext);
  const [tagInput, setTagInput] = useState("");
  const [existingTagsIds, setExistingTagsIds] = useState([]);

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

  const { refetch: refetchTagFromName, loading: loadingtagFromName } =
    useQuery<GetTagFromTagNameQuery>(GET_TAG_FROM_TAGNAME);

  const { data: searchAllTags } = useQuery<SearchAllTagsQuery>(
    SEARCH_IN_ALL_TAGS,
    {
      fetchPolicy: "network-only",
      variables: {
        search: `%${tagInput}%`,
        tagIds: existingTagsIds,
      },
    }
  );

  /*
   * MUTATIONS
   */
  const [insertTag] = useMutation(INSERT_SKILL_TO_TAG);
  const [deleteTag] = useMutation(DELETE_SKILL_TO_TAG);

  /*
   * FUNCTIONS
   */
  const addTag = async (tagName: string) => {
    const refetchedSkill = await refetchTagFromName({
      tagName: tagName,
    });
    insertTag({
      variables: { skillId: skill.id, tagId: refetchedSkill.data.Tag[0]?.id },
    }).then(() => refetchTags({ skillId: skill.id }));
  };

  const removeTag = (tag: SkillTag) => {
    deleteTag({
      variables: {
        skillId: skill.id,
        tagId: tag.tagId,
      },
    }).then(() => refetchTags({ skillId: skill.id }));
  };

  useEffect(() => {
    if (!tagsBySkill) return;
    let tagsIds = [];

    tagsBySkill.SkillTag.map((tag) => {
      tagsIds.push(tag.tagId);
    });
    setExistingTagsIds(tagsIds);
  }, [tagsBySkill]);

  if (loadingTagsBySkill || loadingtagFromName) return <Loading />;

  return (
    <div className="w-full rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2">
      <p className="text-xl p-2">Tags</p>
      <div className="flex flex-row flex-wrap">
        {tagsBySkill &&
          tagsBySkill.SkillTag.map((tag, i) => {
            return (
              <div className="px-2" key={i}>
                <Chip
                  type="primary"
                  style="contained"
                  callback={() => removeTag(tag)}
                >
                  {tag.Tag.name}
                </Chip>
              </div>
            );
          })}
      </div>
      <div className="w-full flex flex-col pt-4">
        <input
          className={`bg-light-light dark:bg-dark-light p-3 appearance-none rounded-lg border border-solid border-light-dark`}
          type="text"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
          }}
          placeholder={t("admin.addTags")}
        ></input>
        <AutoCompleteList
          choices={searchAllTags?.Tag.map((tag) => tag.name) ?? []}
          onChange={(tag) => addTag(tag)}
          search={tagInput}
        />
      </div>
    </div>
  );
};

export default EditTags;
