import { useMutation, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import {
  EditSkillMutation,
  GetAllCategoriesQuery,
  GetTopicsInfosQuery,
  SkillTopicsBySkillQuery,
} from "../../generated/graphql";
import {
  ADD_SKILL_TO_TOPIC,
  DELETE_SKILL_TO_TOPIC,
  EDIT_SKILL,
} from "../../graphql/mutations/skills";
import { GET_ALL_CATEGORIES } from "../../graphql/queries/categories";
import { GET_SKILLTOPICS_BY_SKILL } from "../../graphql/queries/skills";
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

type EditSkillAdminProps = {
  skill: FetchedSkill;
};

const EditSkillAdmin = ({ skill }: EditSkillAdminProps) => {
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
    data: topicsBySkill,
    refetch: refetchTopics,
    loading: loadingTopicBySkill,
  } = useQuery<SkillTopicsBySkillQuery>(GET_SKILLTOPICS_BY_SKILL, {
    fetchPolicy: "network-only",
    variables: {
      skillId: skill?.id,
    },
  });
  /*
   * MUTATIONS
   */
  const [editSkill] = useMutation<EditSkillMutation>(EDIT_SKILL);
  const [insertTopic] = useMutation(ADD_SKILL_TO_TOPIC);
  const [deleteTopic] = useMutation(DELETE_SKILL_TO_TOPIC);

  const addTopic = (topic: TopicItem) => {
    insertTopic({
      variables: { skillId: skill.id, topicId: topic.id },
    }).then(() => {
      displayNotification(
        t("skills.addSkillTopicSuccess").replace("%topic%", topic.name),
        "green",
        5000
      );
      refetchTopics({
        variables: { skillId: skill.id },
      });
    });
  };

  const removeTopic = (topic: TopicItem) => {
    deleteTopic({
      variables: { skillId: skill.id, topicId: topic.id },
    }).then(() => {
      displayNotification(
        t("skills.deleteSkillTopicSuccess").replace("%topic%", topic.name),
        "green",
        5000
      );
      refetchTopics({
        variables: { skillId: skill.id },
      });
    });
  };

  if (loadingTopics || loadingCategories || loadingTopicBySkill) {
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
        )} ${skill.name}`}</h2>
      </div>
      <div className="mt-4 mb-4">
        <SkillDescription skill={skill} title={t("admin.description")} />
        <div className="flex flex-col rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2 pb-6">
          <p className="text-xl p-2">{t("admin.category")}</p>
          <CustomSelect
            labelFn={(x) => x.label}
            keyFn={(x) => x.id}
            choices={categories.Category.map((categorie) => categorie) ?? []}
            selectedChoice={categories.Category.find(
              (categorie) => categorie.id === skill.categoryId
            )}
            placeholder={t("myProfile.selectPlaceholder")}
            onChange={(categorie) => {
              editSkill({
                variables: {
                  id: skill.id,
                  categoryId: categorie.id,
                },
              })
                .then(() => {
                  displayNotification(
                    t("skills.updateSkillSuccess").replace(
                      "%skill%",
                      skill.name
                    ),
                    "green",
                    5000
                  );
                })
                .catch(() => {
                  displayNotification(
                    t("skills.updateSkillFailed").replace(
                      "%skill%",
                      skill.name
                    ),
                    "red",
                    5000
                  );
                });
            }}
          />
        </div>
        <EditTags skill={skill} />
        <Topics
          topics={topics.Topic.map((topic) => {
            return { id: topic.id, name: topic.name };
          })}
          selectedTopics={topicsBySkill.SkillTopic.map((t) => t.topicId)}
          title={t("admin.topics")}
          addCallback={(topic) => {
            addTopic(topic);
          }}
          removeCallback={(topic) => {
            removeTopic(topic);
          }}
        />
      </div>
    </div>
  );
};

export default EditSkillAdmin;
