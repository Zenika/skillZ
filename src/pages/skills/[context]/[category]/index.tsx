import { useMutation, useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import CommonPage from "../../../../components/CommonPage";
import ErrorPage from "../../../../components/ErrorPage";
import Loading from "../../../../components/Loading";
import PageWithSkillList from "../../../../components/PageWithSkillList";
import { GetCategoryIdByNameQuery } from "../../../../generated/graphql";
import { ADD_USER_SKILL_MUTATION } from "../../../../graphql/mutations/skills";
import { DELETE_USER_SKILL_MUTATION } from "../../../../graphql/mutations/userInfos";
import { GET_CATEGORIE_ID_BY_NAME } from "../../../../graphql/queries/categories";
import { useFetchSkillsByContextCategoryAndAgency } from "../../../../utils/fetchers/useFetchSkillsByContextCategoryAndAgency";
import { i18nContext } from "../../../../utils/i18nContext";
import { useComputeFilterUrl } from "../../../../utils/useComputeFilterUrl";
import { useNotification } from "../../../../utils/useNotification";

const ListSkillsPage = () => {
  /*
   * HOOKS
   */
  const { user, isLoading } = useAuth0();
  const { t } = useContext(i18nContext);
  const router = useRouter();

  /*
   * CONTEXT
   */
  let { context, category, agency } = router.query;
  context = typeof context === "string" ? context : context?.join("") ?? null;
  category =
    typeof category === "string" ? category : category?.join("") ?? null;
  agency = typeof agency === "string" ? agency : agency?.join("") ?? null;

  /*
   * STATES
   */
  const [modalOpened, setModalOpened] = useState(false);

  /*
   * QUERIES
   */
  const {
    data: categoryData,
    refetch: categoryRefetch,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<GetCategoryIdByNameQuery>(GET_CATEGORIE_ID_BY_NAME, {
    variables: {
      name: category,
    },
  });

  const {
    skillsData,
    color,
    agencies,
    refetch: SkillsRefetch,
    loading: skillsLoading,
  } = useFetchSkillsByContextCategoryAndAgency(
    context,
    category,
    agency,
    user.email
  );

  /*
   * MUTATIONS
   */
  const [addSkill, { error: mutationError }] = useMutation(
    ADD_USER_SKILL_MUTATION
  );
  const [deleteSkill, { error: mutationDeleteError }] = useMutation(
    DELETE_USER_SKILL_MUTATION
  );

  const editSkillAction = ({ id, name, skillLevel, desireLevel, add }) => {
    if (add) {
      addSkill({
        variables: {
          skillId: id,
          email: user?.email,
          skillLevel,
          desireLevel,
        },
      })
        .then(async () => {
          SkillsRefetch()
            .then(() => {
              useNotification(
                t("skills.updateSkillSuccess").replace("%skill%", name),
                "green",
                5000
              );
            })
            .catch(() =>
              useNotification(t("skills.refreshSkillFailed"), "red", 5000)
            );
        })
        .catch(() => {
          useNotification(
            t("skills.updateSkillFailed").replace("%skill%", name),
            "red",
            5000
          );
        });
    } else {
      deleteSkill({
        variables: {
          email: user?.email,
          skillId: id,
        },
      })
        .then(async () => {
          SkillsRefetch()
            .then(() => {
              useNotification(
                t("skills.deleteSkillSuccess").replace("%skill%", name),
                "green",
                5000
              );
            })
            .catch(() =>
              useNotification(t("skills.refreshSkillFailed"), "red", 5000)
            );
        })
        .catch(() => {
          useNotification(t("skills.deleteSkillFailed"), "red", 5000);
        });
    }
  };

  const renderResult = () => {
    if (isLoading || skillsLoading || categoryLoading) {
      return <Loading />;
    }
    if (categoryError) {
      return <ErrorPage />;
    }
    return (
      <PageWithSkillList
        context={context}
        category={{
          name: category as string,
          id: categoryData.Category[0].id,
        }}
        editSkillAction={editSkillAction}
        filters={
          context !== "mine"
            ? [
                {
                  name: "Agency",
                  values: ["World", ...(agencies ?? [])],
                  selected: agency
                    ? typeof agency === "string"
                      ? agency
                      : agency?.join("-")
                    : "World",
                  callback: (value) =>
                    router.push(
                      useComputeFilterUrl(
                        `${window.location}`,
                        value ? [{ name: "agency", value: `${value}` }] : []
                      )
                    ),
                },
              ]
            : undefined
        }
        data={skillsData}
        color={color}
        setFadedPage={setModalOpened}
      />
    );
  };
  return (
    <CommonPage page={category} faded={modalOpened} context={context}>
      {renderResult()}
    </CommonPage>
  );
};

export default withAuthenticationRequired(ListSkillsPage);
