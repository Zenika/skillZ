import { NextApiRequest, NextApiResponse } from 'next'
import { GetAllSkillsFetcher } from '../../utils/fetchers/getAllSkillsFetcher'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method != 'GET') {
        return res.status(404).json({ message: 'Method not allowed.' })
    }

    if (
        !process.env.NEXT_PUBLIC_GRAPHQL_URL ||
        !process.env.HASURA_ADMIN_SECRET ||
        !process.env.NEXT_API_BEARER_TOKEN
    ) {
        return res
            .status(500)
            .json({ message: 'Missing environment variables' })
    }

    if (req.headers.authorization !== process.env.NEXT_API_BEARER_TOKEN) {
        return res.status(401).json({ message: 'Wrong bearer token.' })
    }

    const result = await GetAllSkillsFetcher()

    if (!result) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }

    const { Skill } = result.data

    res.status(200).json({ skills: Skill })
}
