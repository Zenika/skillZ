import { useQuery } from '@apollo/client'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import Loading from '../../../../components/molecules/Loading'
import UserInfosTopBar from '../../../../components/molecules/UserInfosTopBar'
import SkillListOverview from '../../../../components/organisms/SkillListOverview'
import CommonPage from '../../../../components/templates/CommonPage'
import ErrorPage from '../../../../components/templates/ErrorPage'
import {
    GetCategoryIdByNameQuery,
    GetUserQuery,
} from '../../../../generated/graphql'
import { GET_CATEGORIE_ID_BY_NAME } from '../../../../graphql/queries/categories'
import { GET_USER_QUERY } from '../../../../graphql/queries/userInfos'
import { useI18n } from '../../../../providers/I18nProvider'

const ListSkillsPage = () => {
    /*
     * HOOKS
     */
    const { user, isLoading: authLoading, error: authError } = useAuth0()
    const router = useRouter()
    const { t } = useI18n()

    /*
     * CONTEXT
     */
    let { context, category, agency } = router.query
    context =
        typeof context === 'string' ? context : (context?.join('') ?? null)
    category =
        typeof category === 'string' ? category : (category?.join('') ?? null)
    agency = typeof agency === 'string' ? agency : (agency?.join('') ?? null)

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
    })

    const {
        data: userInfosDatas,
        loading: userLoading,
        error: userError,
    } = useQuery<GetUserQuery>(GET_USER_QUERY, {
        variables: { email: context?.toString() },
        fetchPolicy: 'network-only',
    })

    if (authLoading || userLoading || categoryLoading) {
        return <Loading />
    }
    if (authError || userError || categoryError) {
        return <ErrorPage />
    }

    return (
        <CommonPage page={category}>
            {context != 'mine' &&
                context != 'zenika' &&
                userInfosDatas.User.length && (
                    <UserInfosTopBar
                        userEmail={user?.email}
                        userName={userInfosDatas.User[0].name}
                        userPicture={userInfosDatas.User[0].picture}
                        sentence={t('skills.topBar.title').replace(
                            '%category%',
                            category as string
                        )}
                    />
                )}
            <SkillListOverview
                userEmail={
                    context === 'mine' ? user?.email : context.toString()
                }
                context={context as string}
                agency={agency as string}
                category={{
                    name: category as string,
                    id: categoryData.Category[0].id,
                }}
            />
        </CommonPage>
    )
}

export default withAuthenticationRequired(ListSkillsPage)
