import { useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CommonPage from "../../../../components/CommonPage";
import ErrorPage from "../../../../components/ErrorPage";
import Loading from "../../../../components/Loading";
import PageWithSkillList from "../../../../components/PageWithSkillList";
import { GetCategoryIdByNameQuery } from "../../../../generated/graphql";
import { GET_CATEGORIE_ID_BY_NAME } from "../../../../graphql/queries/categories";
import UserInfosTopBar from "../../../../components/UserInfosTopBar";
import { GetUserQuery } from "../../../../generated/graphql";
import { GET_USER_QUERY } from "../../../../graphql/queries/userInfos";
import { i18nContext } from "../../../../utils/i18nContext";
import { useContext } from "react";

const ListSkillsPage = () => {
  /*
   * HOOKS
   */
  const { user, isLoading } = useAuth0();
  const router = useRouter();
  const { t } = useContext(i18nContext);

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
  const { data: userInfosDatas } = useQuery<GetUserQuery>(GET_USER_QUERY, {
    variables: { email: context?.toString() },
    fetchPolicy: "network-only",
  });
  const [userInfos, setUserInfos] = useState(null);

  useEffect(() => {
    if (userInfosDatas) setUserInfos(userInfosDatas.User[0]);
  }, [userInfosDatas]);

  const renderResult = () => {
    if (isLoading || categoryLoading) {
      return <Loading />;
    }
    if (categoryError) {
      return <ErrorPage />;
    }
    return (
      <>
        {context != "mine" && context != "zenika" && (
          <UserInfosTopBar
            userEmail={user?.email}
            userName={userInfos?.name}
            userPicture={userInfos?.picture}
            sentence={t("skills.topBar.title").replace(
              "%category%",
              category as string
            )}
          />
        )}
        <PageWithSkillList
          userEmail={context === "mine" ? user?.email : context.toString()}
          context={context as string}
          agency={agency as string}
          category={{
            name: category as string,
            id: categoryData.Category[0].id,
          }}
          setFadedPage={setModalOpened}
        />
      </>
    );
  };
  return (
    <CommonPage page={category} faded={modalOpened} context={context}>
      {renderResult()}
    </CommonPage>
  );
};

export default withAuthenticationRequired(ListSkillsPage);
