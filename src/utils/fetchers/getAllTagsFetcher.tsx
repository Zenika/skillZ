import { of } from 'await-of'
import { fetcher } from '../fetcher'

export const GetAllTagsQuery = `
query getAllTags {
  Tag(order_by: {name: asc}) {
    creator
    id
    name
  }
}`

export const GetAllTagsFetcher = async () => {
    const [response, err] = await of(fetcher(GetAllTagsQuery, {}))

    if (err) {
        console.error(err)
        return null
    }

    return await response.json()
}
