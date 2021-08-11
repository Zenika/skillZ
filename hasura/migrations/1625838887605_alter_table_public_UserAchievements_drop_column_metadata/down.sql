ALTER TABLE "public"."UserAchievements" ADD COLUMN "metadata" json;
ALTER TABLE "public"."UserAchievements" ALTER COLUMN "metadata" DROP NOT NULL;
