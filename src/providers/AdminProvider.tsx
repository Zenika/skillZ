import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { of } from 'await-of'
import jwtDecode from 'jwt-decode'

type AdminContextType = {
    isAdmin: boolean
}

export const AdminContext = createContext<AdminContextType | undefined>(
    undefined
)

export const AdminProvider = ({ children }: { children: any }) => {
    const { getAccessTokenSilently } = useAuth0()
    const [admin, setAdmin] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            const [accessToken] = await of(getAccessTokenSilently())
            const decodedAccessToken = jwtDecode(accessToken)

            setAdmin(
                decodedAccessToken['https://hasura.io/jwt/claims'][
                    'x-hasura-allowed-roles'
                ].includes('skillz-admins')
            )
        })()
    }, [getAccessTokenSilently])

    return (
        <AdminContext.Provider value={{ isAdmin: admin }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = (): AdminContextType => {
    const context = useContext<AdminContextType | undefined>(AdminContext)
    if (!context)
        throw new Error('useAdmin must be used within a AdminProvider')
    return context
}
