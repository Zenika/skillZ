import { of } from "await-of";
import { AchievementRequestData } from "../../pages/api/achievement";
import { fetcher } from "../fetcher";
import { Achievement } from "./types";

const GetSkillCountForCategoryFromSkillQuery = `
query getSkillCountForCategoryFromSkill($skillId: uuid!, $userEmail: String!) {
  Skill_by_pk(id: $skillId) {
    Category {
      CurrentSkillsAndDesires_aggregate(where: {userEmail: {_eq: $userEmail}}) {
        aggregate {
          count
        }
      }
      label
    }
  }
}`;

const InsertCategoryCompletionAchievementMutation = `mutation insertCategoryCompletionAchievement($data: [UserAchievements_insert_input!]!) {
  insert_UserAchievements(objects: $data, on_conflict: {constraint: UserAchievements_userEmail_achievementLabel_additionalInfo_step, update_columns: userEmail}) {
    affected_rows
  }
}
`;

const achievementsMetadata = {
  steps: [5, 10, 15, 20, 25],
  categories: [
    "languages-and-frameworks",
    "platforms",
    "tools",
    "technics-and-methods",
  ],
};
const ACHIEVEMENTS_STEPS: Achievement[] = achievementsMetadata.categories
  .map((category) =>
    achievementsMetadata.steps.map((step) => ({
      label: "categoryCompletion",
      points: 20,
      step,
      additionalInfo: category,
    }))
  )
  .reduce((prev, curr) => [...prev, ...curr]);

/*
Récupérer le nombre de skills pour la catégorie du skill qui a été inséré
si > 5 => 1er palier, si > 10 => 2er palier
*/
export const categoryCompletionAchievement = async (
  payload: AchievementRequestData
) => {
  const { userEmail, data } = payload;
  const [response, err] = await of(
    fetcher(GetSkillCountForCategoryFromSkillQuery, {
      userEmail,
      skillId: data?.skillId,
    })
  );
  if (err) {
    console.error(err);
    return;
  }
  const result = await response.json();
  const skillCount =
    result?.data?.Skill_by_pk?.Category?.CurrentSkillsAndDesires_aggregate
      ?.aggregate?.count;
  const categoryLabel = result?.data?.Skill_by_pk?.Category?.label;
  const achievementsObtained = ACHIEVEMENTS_STEPS.filter(
    (achievement) =>
      skillCount >= achievement.step &&
      categoryLabel === achievement.additionalInfo
  ).map((achievement) => ({ ...achievement, userEmail }));
  const [mutationResult, mutationErr] = await of(
    fetcher(InsertCategoryCompletionAchievementMutation, {
      data: achievementsObtained,
    })
  );
  if (mutationErr) {
    console.error(mutationErr);
    return;
  }
};
