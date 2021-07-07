import { NextApiRequest, NextApiResponse } from "next";
import { onSkillInsertedAchievement } from "../../utils/achievements/onSkillInsertedAchievement";

const ACHIEVEMENTS = {
  onSkillInsertedAchievement: onSkillInsertedAchievement,
};

export type AchievementRequestData = {
  userEmail: string;
  createdAt: Date;
  triggerName: string;
  data: any;
};
type AchievementResponseData = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AchievementResponseData>
) {
  const payload: AchievementRequestData = {
    userEmail: req.body.event.session_variables["x-hasura-user-email"],
    createdAt: req.body.created_at,
    triggerName: req.body.trigger.name,
    data: req.body.event.data.new,
  };
  const result = await ACHIEVEMENTS[payload.triggerName](payload);
  res.status(200).json({ result });
}
