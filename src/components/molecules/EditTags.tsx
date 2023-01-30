import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import {
  GetTagFromTagNameQuery,
  SearchAllTagsQuery,
  SkillTagsBySkillQuery,
} from "../../generated/graphql";
import {
  DELETE_SKILL_TO_TAG,
  INSERT_SKILL_TO_TAG,
} from "../../graphql/mutations/skills";
import { INSERT_NEW_TAG } from "../../graphql/mutations/tags";
import {
  GET_SKILLTAGS_BY_SKILL,
  GET_TAG_FROM_TAGNAME,
  SEARCH_IN_ALL_TAGS,
} from "../../graphql/queries/skills";
import { i18nContext } from "../../utils/i18nContext";
import { FetchedSkill, SkillTag } from "../../utils/types";
import AutoCompleteList from "../atoms/AutoCompleteList";
import Chip from "../atoms/Chip";
import Loading from "./Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { displayNotification } from "../../utils/displayNotification";

type EditTags = {
  skill: FetchedSkill;
  refetchSkill: () => void;
  description?: string;
  adminView: boolean;
};

const EditTags = ({
  skill,
  refetchSkill,
  description,
  adminView,
}: EditTags) => {
  const { t } = useContext(i18nContext);
  const [tagInput, setTagInput] = useState("");
  const { user } = useAuth0();
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

  const { data: searchAllTags, refetch: refetchSearch } =
    useQuery<SearchAllTagsQuery>(SEARCH_IN_ALL_TAGS, {
      fetchPolicy: "network-only",
      variables: {
        search: `%${tagInput}%`,
        tagIds: existingTagsIds,
      },
    });

  /*
   * MUTATIONS
   */
  const [insertTag] = useMutation(INSERT_SKILL_TO_TAG);
  const [insertNewTag] = useMutation(INSERT_NEW_TAG);
  const [deleteTag] = useMutation(DELETE_SKILL_TO_TAG);

  /*
   * FUNCTIONS
   */

  const addTag = async (tagName: string, addNew: boolean) => {
    if (addNew) {
      insertNewTag({
        variables: { tagName: tagName, creatorEmail: user.email },
      }).then((res) => {
        if (res.data.insert_Tag.affected_rows === 0) {
          displayNotification(`${t("error.duplicatedTag")}`, "red", 5000);
        } else {
          displayNotification(
            `${t("skills.tags.tagAdded").replace("%tag%", tagName)}`,
            "green",
            5000
          );
        }
        refetchSearch();
      });
    } else {
      const refetchedSkill = await refetchTagFromName({
        tagName: tagName,
      });
      insertTag({
        variables: { skillId: skill.id, tagId: refetchedSkill.data.Tag[0]?.id },
      }).then((res) => {
        if (res.data.affected_rows === 0) {
          displayNotification(`${t("error.refetch")}`, "red", 5000);
        } else {
          displayNotification(
            `${t("skills.tags.tagLinked")
              .replace("%tag%", tagName)
              .replace("%skill%", skill.name)}`,
            "green",
            5000
          );
        }

        refetchTags({ skillId: skill.id });
      });
    }
  };

  const removeTag = (tag: SkillTag) => {
    deleteTag({
      variables: {
        skillId: skill.id,
        tagId: tag.tagId,
      },
    }).then((res) => {
      if (res.data.affected_rows === 0) {
        displayNotification(`${t("error.refetch")}`, "red", 5000);
      } else {
        displayNotification(`${t("skills.tags.tagDeleted")}`, "green", 5000);
      }
      refetchTags({ skillId: skill.id });
    });
  };

  useEffect(() => {
    if (!tagsBySkill) return;
    let tagsIds = [];

    tagsBySkill.SkillTag.map((tag) => {
      tagsIds.push(tag.tagId);
    });
    setExistingTagsIds(tagsIds);
    refetchSkill();
  }, [tagsBySkill, refetchSkill]);

  if (loadingTagsBySkill || loadingtagFromName) return <Loading />;

  return (
    <div className="w-full rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2">
      <div className="flex flex-row items-center">
        <div className="flex flex-col items-align p-2">
          <p className="text-xl">{t("skills.tags.tags")}</p>
          <p className="text-sm opacity-50">{description}</p>
        </div>
        {tagsBySkill?.SkillTag.length === 0 && adminView && (
          <div className="flex flex-row items-center">
            <RiErrorWarningFill color="#bf1d67" />
            <p className="text-light-red pl-1">{t("error.tagRequired")}</p>
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap">
        {tagsBySkill &&
          tagsBySkill.SkillTag.map((tag, i) => {
            return (
              <div className="px-2" key={i}>
                <Chip type="primary" callback={() => removeTag(tag)}>
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
          onChange={(tag, addNew) => addTag(tag, addNew)}
          search={tagInput}
          newType={t("skills.tags.create")}
        />
      </div>
    </div>
  );
};

export default EditTags;
