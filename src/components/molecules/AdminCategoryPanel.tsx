import { useMutation } from "@apollo/client";
import { useState } from "react";
import { textColorTable } from "../../constants/colorTable";
import { UpdateCategoryByPkMutation } from "../../generated/graphql";
import { UPDATE_CATEGORY_BY_PK } from "../../graphql/mutations/categories";
import { displayNotification } from "../../utils/displayNotification";
import { CategoryItem } from "../../utils/types";
import Button from "../atoms/Button";
import TextArea from "../atoms/TextArea";
import { useI18n } from "../../providers/I18nProvider";

type AdminCategoryPanelProps = {
  category: CategoryItem;
  key: string;
};

const AdminCategoryPanel = ({ category, key }: AdminCategoryPanelProps) => {
  const { t } = useI18n();

  /*
   * STATES
   */
  const [description, setDescription] = useState<string>(category.description);

  /*
   * MUTATIONS
   */
  const [updateCategoryByPk] = useMutation<UpdateCategoryByPkMutation>(
    UPDATE_CATEGORY_BY_PK
  );

  const onUpdateCategoryClick = async () => {
    await updateCategoryByPk({
      variables: { id: category.id, description: description },
    })
      .then(() => {
        displayNotification(
          t("admin.notification.descriptionSuccess").replace(
            "%skill%",
            category.label
          ),
          "green",
          5000
        );
      })
      .catch(({}) => {
        displayNotification(`${t("error.unknown")}`, "red", 5000);
      });
  };

  return (
    <div
      className={`flex flex-row bg-light-light dark:bg-dark-light p-4 m-2 rounded-lg items-center`}
      key={key}
    >
      <div className={`flex flex-col w-full`}>
        <div className="flex flex-row justify-between">
          <h2 className={`text-xl ${textColorTable[category.color]}`}>
            {category.label}
          </h2>
        </div>
        <TextArea
          callback={(e) => setDescription(e)}
          error={false}
          value={description}
          errorMessage={""}
          rows={2}
          name={"label"}
        />
        <div className="flex flex-end justify-end">
          <div className="flex flex-col">
            <Button type={"primary"} callback={onUpdateCategoryClick}>
              {t("admin.update")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryPanel;
