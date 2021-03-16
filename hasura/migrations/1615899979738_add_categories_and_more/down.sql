
ALTER TABLE "public"."Category" DROP COLUMN "index";

ALTER TABLE "public"."Category" DROP COLUMN "color";

ALTER TABLE "public"."Category" DROP COLUMN "y";

ALTER TABLE "public"."Category" DROP COLUMN "x";

ALTER TABLE "public"."Skill" ALTER COLUMN "categoryId" DROP NOT NULL;

alter table "public"."Skill" drop constraint "Skill_categoryId_fkey";

ALTER TABLE "public"."Skill" DROP COLUMN "categoryId";

DROP TABLE "public"."Category";

ALTER TABLE "public"."UserTopic" ADD COLUMN "level" int4;
ALTER TABLE "public"."UserTopic" ALTER COLUMN "level" DROP NOT NULL;
ALTER TABLE "public"."UserTopic" ALTER COLUMN "level" SET DEFAULT 1;

DROP TABLE "public"."UserTopic";

ALTER TABLE "public"."User" ADD COLUMN "agency" text;
ALTER TABLE "public"."User" ALTER COLUMN "agency" DROP NOT NULL;

alter table "public"."Topic" drop constraint "Topic_name_key";

alter table "public"."Skill" drop constraint "Skill_name_key";
