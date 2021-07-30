CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "public"."UserAchievements" ADD COLUMN "id" uuid NOT NULL DEFAULT gen_random_uuid();
