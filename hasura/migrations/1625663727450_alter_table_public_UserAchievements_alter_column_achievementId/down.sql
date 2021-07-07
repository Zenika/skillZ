ALTER TABLE "public"."UserAchievements" ALTER COLUMN "achievementId" TYPE uuid;
alter table "public"."UserAchievements" rename column "achievementLabel" to "achievementId";
