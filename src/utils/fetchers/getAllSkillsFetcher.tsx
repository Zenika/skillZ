import { of } from 'await-of'
import { fetcher } from '../fetcher'

export const GetAllSkillsQuery = `
query getAllSkills {
  Skill(where: {verified: {_eq: true}}, order_by: {name: asc}) {
    id
    categoryId
    description
    name
    verified
  }
}`

export const GetAllSkillsFetcher = async () => {
    const [response, err] = await of(fetcher(GetAllSkillsQuery, {}))

    if (err) {
        console.error(err)
        return null
    }

    return await response.json()
}
