import { useMutation, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import {
  EditSkillMutation,
  GetAllCategoriesQuery,
} from "../../generated/graphql";
import { EDIT_SKILL } from "../../graphql/mutations/skills";
import { GET_ALL_CATEGORIES } from "../../graphql/queries/categories";
import { displayNotification } from "../../utils/displayNotification";
import { i18nContext } from "../../utils/i18nContext";
import { FetchedSkill } from "../../utils/types";
import Button from "../Button";
import CustomSelect from "../CustomSelect";
import ErrorPage from "../ErrorPage";

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
  const {
    data: categories,
    loading: categoriesLoading,
    error,
  } = useQuery<GetAllCategoriesQuery>(GET_ALL_CATEGORIES);

  /*
   * MUTATIONS
   */
  const [editSkill] = useMutation<EditSkillMutation>(EDIT_SKILL);

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

  const onDeleteButtonClick = () => {};

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col my-16 mx-6 bg-light-light dark:bg-dark-light p-6 rounded-lg max-w-screen-sm w-full z-50">
      <div className="flex flex-row place-content-between">
        <h1 className="flex-start px-2 my-4 text-xl text-bold">{skill.name}</h1>
      </div>
      <div className="flex flex-col my-4 ">
        {!categoriesLoading && (
          <div className={"my-4"}>
            <span className="text-sm">{t("admin.category")}</span>
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
        )}
      </div>
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
