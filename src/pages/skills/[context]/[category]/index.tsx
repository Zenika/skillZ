import { useQuery } from "@apollo/client";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import CommonPage from "../../../../components/CommonPage";
import ErrorPage from "../../../../components/ErrorPage";
import Loading from "../../../../components/Loading";
import SkillListOverview from "../../../../components/SkillListOverview";
import UserInfosTopBar from "../../../../components/UserInfosTopBar";
import {
  GetCategoryIdByNameQuery,
  GetUserQuery,
} from "../../../../generated/graphql";
import { GET_CATEGORIE_ID_BY_NAME } from "../../../../graphql/queries/categories";
import { GET_USER_QUERY } from "../../../../graphql/queries/userInfos";
import { i18nContext } from "../../../../utils/i18nContext";

const ListSkillsPage = () => {
  /*
   * HOOKS
   */
  const { user, isLoading: authLoading, error: authError } = useAuth0();
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
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<GetCategoryIdByNameQuery>(GET_CATEGORIE_ID_BY_NAME, {
    variables: {
      name: category,
    },
  });

  const {
    data: userInfosDatas,
    loading: userLoading,
    error: userError,
  } = useQuery<GetUserQuery>(GET_USER_QUERY, {
    variables: { email: context?.toString() },
    fetchPolicy: "network-only",
  });

  if (authLoading || userLoading || categoryLoading) {
    return <Loading />;
  }
  if (authError || userError || categoryError) {
    return <ErrorPage />;
  }

  return (
    <CommonPage page={category} faded={modalOpened}>
      {context != "mine" &&
        context != "zenika" &&
        userInfosDatas.User.length && (
          <UserInfosTopBar
            userEmail={user?.email}
            userName={userInfosDatas.User[0].name}
            userPicture={userInfosDatas.User[0].picture}
            sentence={t("skills.topBar.title").replace(
              "%category%",
              category as string
            )}
          />
        )}
      <SkillListOverview
        userEmail={context === "mine" ? user?.email : context.toString()}
        context={context as string}
        agency={agency as string}
        category={{
          name: category as string,
          id: categoryData.Category[0].id,
        }}
        setFadedPage={setModalOpened}
      />
    </CommonPage>
  );
};

export default withAuthenticationRequired(ListSkillsPage);
