alter table "public"."UserAchievements" add constraint "UserAchievements_userEmail_achievementLabel_additionalInfo_step_key" unique ("userEmail", "achievementLabel", "additionalInfo", "step");
