import { useQuery } from '@apollo/client'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import Loading from '../../../components/molecules/Loading'
import UserPanel from '../../../components/molecules/UserPanel'
import CommonPage from '../../../components/templates/CommonPage'
import ErrorPage from '../../../components/templates/ErrorPage'
import { GetUserCertificationQuery } from '../../../generated/graphql'
import { GET_USER_CERTIFICATION } from '../../../graphql/queries/certifications'

const CertificationPage = () => {
    const router = useRouter()
    let { certification } = router.query

    const isDesktop = useMediaQuery({
        query: '(min-device-width: 1280px)',
    })

    certification = certification
        ? typeof certification === 'string'
            ? certification
            : certification.join('')
        : undefined

    /*
     * QUERIES
     */
    const { data, error, loading } = useQuery<GetUserCertificationQuery>(
        GET_USER_CERTIFICATION,
        {
            variables: { name: certification },
        }
    )

    if (loading) {
        return <Loading />
    } else if (error) {
        return <ErrorPage />
    }
    return (
        <CommonPage page={certification}>
            <div className="flex flex-row justify-center mt-4 mb-20">
                <div className="flex flex-row justify-center max-w-screen-xl w-full p-4">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-center w-full">
                            <div
                                className={`flex flex-col ${
                                    isDesktop ? 'w-1/3' : 'w-full'
                                } px-2`}
                            >
                                <div className="flex flex-col mt-6 max-w-screen-xl min-h-screen">
                                    {data?.UserCertification.map(
                                        (userCert, index) => (
                                            <UserPanel
                                                user={{
                                                    ...userCert.User,
                                                    agency: userCert.User
                                                        .UserLatestAgency
                                                        .agency,
                                                }}
                                                context={''}
                                                key={`user-certification-${index}`}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommonPage>
    )
}

export default withAuthenticationRequired(CertificationPage)
