import { NextApiRequest, NextApiResponse } from 'next'
import { categoryCompletionAchievement } from '../../utils/achievements/categoryCompletionAchievement'
import { categoryProfileAchievement } from '../../utils/achievements/profileCompletionAchievement'

const ACHIEVEMENTS = {
    categoryCompletionAchievement: categoryCompletionAchievement,
    categoryProfileAchievement: categoryProfileAchievement,
}

export type AchievementRequestData = {
    userEmail: string
    createdAt: Date
    triggerName: string
    data: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.headers.authorization !== process.env.NEXT_API_BEARER_TOKEN) {
        res.status(403).json({})
    }
    const payload: AchievementRequestData = {
        userEmail: req.body.event.session_variables['x-hasura-user-email'],
        createdAt: req.body.created_at,
        triggerName: req.body.trigger.name,
        data: req.body.event.data.new,
    }
    const result = await ACHIEVEMENTS[payload.triggerName](payload)
    res.status(200).json({ result })
}
