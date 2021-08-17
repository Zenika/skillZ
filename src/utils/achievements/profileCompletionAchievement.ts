import { of } from "await-of";
import { AchievementRequestData } from "../../pages/api/achievement";
import { fetcher } from "../fetcher";
import { Achievement } from "./types";

export const GetPreferedTopicsQuery = `
query getUserTopicsCount($email: String!) {
UserTopic_aggregate(where: {userEmail: {_eq: $email}}) {
    aggregate {
      count
    }
}
}`;

const InsertCategoryCompletionAchievementMutation = `mutation insertProfileAchievement($data: [UserAchievements_insert_input!]!) {
    insert_UserAchievements(objects: $data, on_conflict: {constraint: UserAchievements_userEmail_label_additionalInfo_step_key, update_columns: userEmail}) {
      affected_rows
    };
  }
  `;

const achievementsMetadata = {
  steps: [4],
};
export const ACHIEVEMENTS_STEPS: Achievement[] = achievementsMetadata.steps.map(
  (step) => ({
    label: "profileCompletion",
    points: 20,
    step,
    additionalInfo: "preferedTopics",
  })
);

/*
Récupérer le nombre de skills pour la catégorie du skill qui a été inséré
si > 5 => 1er palier, si > 10 => 2er palier
*/
export const categoryProfileAchievement = async (
  payload: AchievementRequestData
) => {
  const { userEmail, data } = payload;
  const [response, err] = await of(
    fetcher(GetPreferedTopicsQuery, {
      userEmail,
    })
  );
  if (err) {
    console.error(err);
    return;
  }
  const result = await response.json();
  const topicsCount = result?.UserTopic_aggregate?.aggregate?.count;
  const achievementsObtained = ACHIEVEMENTS_STEPS.filter(
    (achievement) =>
      topicsCount >= achievement.step &&
      achievement.additionalInfo === "preferedTopics"
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
