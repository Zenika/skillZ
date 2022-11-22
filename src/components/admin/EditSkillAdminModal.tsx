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
import { FetchedSkill, Topic } from "../../utils/types";
import Button from "../Button";
import CustomSelect from "../CustomSelect";
import ErrorPage from "../ErrorPage";
import Loading from "../Loading";
import Topics from "../Topics";

type EditSkillAdminModalProps = {
  skill: FetchedSkill;
  cancel: () => void;
  callback: () => void;
};

const EditSkillAdminModal = ({
  skill,
  cancel,
  callback,
}: EditSkillAdminModalProps) => {
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
    refetch,
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

  const onEditButtonClick = () => {
    editSkill({
      variables: {
        id: skill.id,
        categoryId: skill.categoryId,
      },
    })
      .then(() => {
        displayNotification(
          t("skills.updateSkillSuccess").replace("%skill%", skill.name),
          "green",
          5000
        );
        callback();
      })
      .catch(() => {
        displayNotification(
          t("skills.updateSkillFailed").replace("%skill%", skill.name),
          "red",
          5000
        );
        callback();
      });
  };

  const addTopic = (topic: Topic) => {
    insertTopic({
      variables: { skillId: skill.id, topicId: topic.id },
    }).then(() =>
      refetch({
        variables: { skillId: skill.id },
      })
    );
  };

  const removeTopic = (topic: Topic) => {
    deleteTopic({
      variables: { skillId: skill.id, topicId: topic.id },
    }).then(() =>
      refetch({
        variables: { skillId: skill.id },
      })
    );
  };

  if (loadingTopics || loadingCategories || loadingTopicBySkill) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col my-16 mx-6 bg-light-light dark:bg-dark-light p-6 rounded-lg max-w-screen-sm w-full z-50">
      <div className="flex flex-row place-content-between border-b">
        <h2 className="flex-start px-2 my-4 text-xl text-bold">{`${t(
          "admin.update"
        )} ${skill.name}`}</h2>
      </div>
      <div
        className={`flex flex-col rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2 pb-6`}
      >
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
            skill.categoryId = categorie.id;
          }}
        />
      </div>
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

      <div className="flex flex-row justify-between">
        <Button type={"secondary"} style={"contained"} callback={cancel}>
          {t("skills.modal.cancel")}
        </Button>
        <div className={"flex flex-row gap-4"}>
          <Button
            type={"primary"}
            style={"contained"}
            callback={onEditButtonClick}
          >
            {t("admin.update")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditSkillAdminModal;
