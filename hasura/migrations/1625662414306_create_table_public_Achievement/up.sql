CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Achievement"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "label" text NOT NULL, "points" integer NOT NULL, "achievementCategoryId" uuid NOT NULL, PRIMARY KEY ("id") );
