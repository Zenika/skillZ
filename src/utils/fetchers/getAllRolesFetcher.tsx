import { of } from 'await-of'
import { fetcher } from '../fetcher'

export const GetAllRolesQuery = `
query getAllRoles {
  Role(order_by: {name: asc}) {
    name
  }
}`

export const GetAllRolesFetcher = async () => {
    const [response, err] = await of(fetcher(GetAllRolesQuery, {}))

    if (err) {
        console.error(err)
        return null
    }

    return await response.json()
}
