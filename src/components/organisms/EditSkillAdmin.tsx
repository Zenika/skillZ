import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import {
  EditSkillMutation,
  GetAllCategoriesQuery,
  GetTopicsInfosQuery,
  SetVerifiedSkillMutationMutationFn,
  SkillMandatoryFieldsQuery,
} from "../../generated/graphql";
import {
  ADD_SKILL_TO_TOPIC,
  DELETE_SKILL_TO_TOPIC,
  EDIT_SKILL,
  UPDATE_SKILL_VERIFIED_MUTATION,
} from "../../graphql/mutations/skills";
import { GET_ALL_CATEGORIES } from "../../graphql/queries/categories";
import { GET_SKILL_MANDATORY_FIELDS } from "../../graphql/queries/skills";
import { GET_TOPICS_INFOS } from "../../graphql/queries/topics";
import { displayNotification } from "../../utils/displayNotification";
import { i18nContext } from "../../utils/i18nContext";
import { TopicItem } from "../../utils/types";
import Button from "../atoms/Button";
import CustomSelect from "../atoms/CustomSelect/CustomSelect";
import EditTags from "../molecules/EditTags";
import Loading from "../molecules/Loading";
import SkillDescription from "../molecules/SkillDescription";
import Topics from "../molecules/Topics";
import ErrorPage from "../templates/ErrorPage";

type EditSkillAdminProps = {
  skillId: string;
};

const EditSkillAdmin = ({ skillId }: EditSkillAdminProps) => {
  const { t } = useContext(i18nContext);
  const router = useRouter();

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

  const [updateVerifiedSkill] = useMutation<SetVerifiedSkillMutationMutationFn>(
    UPDATE_SKILL_VERIFIED_MUTATION
  );

  const updateVerifiedSkillButtonClick = async () => {
    updateVerifiedSkill({
      variables: { skillId: skillId, verified: true },
    })
      .then(() => {
        router.reload();
      })
      .catch(() => {
        displayNotification(`${t("error.unknown")}`, "red", 5000);
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

  const skill = skillSelected?.Skill[0];

  return (
    <div className="flex flex-col max-h-75vh p-2">
      <div className="flex flex-row place-content-between border-b">
        <h2 className="flex-start px-2 my-4 text-xl text-bold">{`${t(
          "admin.update"
        )} ${skill?.name}`}</h2>
      </div>
      <div className="mt-4 pb-4">
        <SkillDescription
          skill={skill}
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
              (categorie) => categorie.id === skill?.categoryId
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
                      skill?.name
                    ),
                    "green",
                    5000
                  );
                })
                .catch(() => {
                  displayNotification(
                    t("skills.updateSkillFailed").replace(
                      "%skill%",
                      skill?.name
                    ),
                    "red",
                    5000
                  );
                });
            }}
          />
        </div>
        <EditTags skill={skill} refetchSkill={refetchSkillSelected} />
        <Topics
          topics={topics.Topic.map((topic) => {
            return { id: topic.id, name: topic.name };
          })}
          selectedTopics={skill?.SkillTopics.map((t) => t.topicId)}
          error={skill?.SkillTopics.length === 0}
          title={t("admin.topics")}
          addCallback={(topic) => {
            addTopic(topic);
          }}
          removeCallback={(topic) => {
            removeTopic(topic);
          }}
        />
      </div>
      <div className="pb-4 self-center">
        {!skill?.verified && (
          <Button
            type="primary"
            disabled={
              !(
                skill?.SkillTags?.length > 0 &&
                skill?.SkillTopics?.length > 0 &&
                skill?.description
              )
            }
            callback={updateVerifiedSkillButtonClick}
          >
            {t("admin.approve")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditSkillAdmin;
