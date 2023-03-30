import { useQuery } from "@apollo/client";
import React from "react";
import { useMediaQuery } from "react-responsive";
import AdminCategoryPanel from "../../components/molecules/AdminCategoryPanel";
import Loading from "../../components/molecules/Loading";
import AdminPage from "../../components/templates/AdminPage";
import ErrorPage from "../../components/templates/ErrorPage";
import { GetAllCategoriesAllPropertiesQuery } from "../../generated/graphql";
import { GET_ALL_CATEGORIES_ALL_PROPERTIES } from "../../graphql/queries/categories";
import { useI18n } from "../../providers/I18nProvider";

export default function AdminCategoriesPage() {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  /*
   * AUTH
   */
  const { t } = useI18n();

  /*
   * QUERIES
   */
  const {
    data: categories,
    loading,
    error,
  } = useQuery<GetAllCategoriesAllPropertiesQuery>(
    GET_ALL_CATEGORIES_ALL_PROPERTIES,
    {
      fetchPolicy: "network-only",
    }
  );

  if (error) {
    return <ErrorPage />;
  } else if (loading) {
    return <Loading />;
  }

  return (
    <AdminPage>
      <div className={`flex justify-center`}>
        <div className={`${isDesktop ? "w-2/3" : "w-full"}`}>
          <div className="flex flex-col mb-5 mt-5 p-4">
            <h1 className="text-xl">{t("admin.categoriesList")}</h1>
            <p className="opacity-50">
              {`${categories.Category.length} ${t("search.result")}`}
            </p>
          </div>
          {categories.Category.map((category) => (
            <AdminCategoryPanel key={category.id} category={category} />
          ))}
        </div>
      </div>
    </AdminPage>
  );
}
