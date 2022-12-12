import { useMutation, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import {
  EditSkillMutation,
  GetAllCategoriesQuery,
  GetTopicsInfosQuery,
  SkillMandatoryFieldsQuery,
} from "../../generated/graphql";
import {
  ADD_SKILL_TO_TOPIC,
  DELETE_SKILL_TO_TOPIC,
  EDIT_SKILL,
} from "../../graphql/mutations/skills";
import { GET_ALL_CATEGORIES } from "../../graphql/queries/categories";
import { GET_SKILL_MANDATORY_FIELDS } from "../../graphql/queries/skills";
import { GET_TOPICS_INFOS } from "../../graphql/queries/topics";
import { displayNotification } from "../../utils/displayNotification";
import { i18nContext } from "../../utils/i18nContext";
import { FetchedSkill, TopicItem } from "../../utils/types";
import CustomSelect from "../CustomSelect";
import ErrorPage from "../ErrorPage";
import Loading from "../Loading";
import Topics from "../Topics";
import SkillDescription from "./SkillDescription";
import EditTags from "./EditTags";
import Button from "../Button";

type EditSkillAdminProps = {
  skillId: string;
};

const EditSkillAdmin = ({ skillId }: EditSkillAdminProps) => {
  const { t } = useContext(i18nContext);

  /*
   * QUERIES
   */
  const { data: topics, loading: loadingTopics } =
    useQuery<GetTopicsInfosQuery>(GET_TOPICS_INFOS);

  const {
    data: categories,
    loading: loadingCategories,
    error,
  } = useQuery<GetAllCategoriesQuery>(GET_ALL_CATEGORIES);

  const {
    data: skillSelected,
    loading: loadingSkillSelected,
    refetch: refetchSkillSelected,
  } = useQuery<SkillMandatoryFieldsQuery>(GET_SKILL_MANDATORY_FIELDS, {
    variables: { skillId: skillId },
  });

  /*
   * MUTATIONS
   */
  const [editSkill] = useMutation<EditSkillMutation>(EDIT_SKILL);
  const [insertTopic] = useMutation(ADD_SKILL_TO_TOPIC);
  const [deleteTopic] = useMutation(DELETE_SKILL_TO_TOPIC);

  const addTopic = (topic: TopicItem) => {
    insertTopic({
      variables: { skillId: skillId, topicId: topic.id },
    }).then(() => {
      displayNotification(
        t("skills.addSkillTopicSuccess").replace("%topic%", topic.name),
        "green",
        5000
      );
      refetchSkillSelected({
        variables: { skillId: skillId },
      });
    });
  };

  const removeTopic = (topic: TopicItem) => {
    deleteTopic({
      variables: { skillId: skillId, topicId: topic.id },
    }).then(() => {
      displayNotification(
        t("skills.deleteSkillTopicSuccess").replace("%topic%", topic.name),
        "green",
        5000
      );
      refetchSkillSelected({
        variables: { skillId: skillId },
      });
    });
  };

  if (loadingTopics || loadingCategories || loadingSkillSelected) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col max-h-75vh p-2">
      <div className="flex flex-row place-content-between border-b">
        <h2 className="flex-start px-2 my-4 text-xl text-bold">{`${t(
          "admin.update"
        )} ${skillSelected?.Skill[0].name}`}</h2>
      </div>
      <div className="mt-4 pb-4">
        <SkillDescription
          skill={skillSelected?.Skill[0]}
          title={t("admin.description")}
          refetchSkill={refetchSkillSelected}
        />
        <div className="flex flex-col rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2 pb-6">
          <p className="text-xl p-2">{t("admin.category")}</p>
          <CustomSelect
            labelFn={(x) => x.label}
            keyFn={(x) => x.id}
            choices={categories.Category.map((categorie) => categorie) ?? []}
            selectedChoice={categories.Category.find(
              (categorie) =>
                categorie.id === skillSelected?.Skill[0]?.categoryId
            )}
            placeholder={t("myProfile.selectPlaceholder")}
            onChange={(categorie) => {
              editSkill({
                variables: {
                  id: skillId,
                  categoryId: categorie.id,
                },
              })
                .then(() => {
                  displayNotification(
                    t("skills.updateSkillSuccess").replace(
                      "%skill%",
                      skillSelected?.Skill[0]?.name
                    ),
                    "green",
                    5000
                  );
                })
                .catch(() => {
                  displayNotification(
                    t("skills.updateSkillFailed").replace(
                      "%skill%",
                      skillSelected?.Skill[0]?.name
                    ),
                    "red",
                    5000
                  );
                });
            }}
          />
        </div>
        {console.log("skillSelected?.Skill[0]?.SkillTopics", skillSelected)}
        <EditTags
          skill={skillSelected?.Skill[0]}
          refetchSkill={refetchSkillSelected}
        />
        <Topics
          topics={topics.Topic.map((topic) => {
            return { id: topic.id, name: topic.name };
          })}
          selectedTopics={skillSelected?.Skill[0]?.SkillTopics.map(
            (t) => t.topicId
          )}
          title={t("admin.topics")}
          addCallback={(topic) => {
            addTopic(topic);
          }}
          removeCallback={(topic) => {
            removeTopic(topic);
          }}
        />
      </div>
      {console.log("prout", skillSelected?.Skill[0]?.SkillTags?.length)}
      <div className="pb-4 self-center">
        {!skillSelected?.Skill[0]?.verified && (
          <Button
            type="primary"
            disabled={
              !(
                skillSelected?.Skill[0]?.SkillTags?.length > 0 &&
                skillSelected?.Skill[0]?.SkillTopics?.length > 0 &&
                skillSelected?.Skill[0]?.description
              )
            }
          >
            {t("admin.approve")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditSkillAdmin;
