ALTER TABLE "public"."UserAchievements" ALTER COLUMN "achievementId" TYPE text;
alter table "public"."UserAchievements" rename column "achievementId" to "achievementLabel";
