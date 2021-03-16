
alter table "public"."Skill" add constraint "Skill_name_key" unique ("name");

alter table "public"."Topic" add constraint "Topic_name_key" unique ("name");

ALTER TABLE "public"."User" DROP COLUMN "agency" CASCADE;

CREATE TABLE "public"."UserTopic"("userEmail" text NOT NULL, "topicId" uuid NOT NULL, "created_at" date NOT NULL DEFAULT now(), "level" integer NOT NULL DEFAULT 1, PRIMARY KEY ("userEmail","topicId","created_at") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("topicId") REFERENCES "public"."Topic"("id") ON UPDATE restrict ON DELETE restrict, CONSTRAINT "check_level_between_1_and_5" CHECK (level >= 1 AND level <= 5));

ALTER TABLE "public"."UserTopic" DROP COLUMN "level" CASCADE;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Category"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "label" text NOT NULL, PRIMARY KEY ("id") );

ALTER TABLE "public"."Skill" ADD COLUMN "categoryId" uuid NULL;

alter table "public"."Skill"
           add constraint "Skill_categoryId_fkey"
           foreign key ("categoryId")
           references "public"."Category"
           ("id") on update restrict on delete restrict;

ALTER TABLE "public"."Skill" ALTER COLUMN "categoryId" SET NOT NULL;

ALTER TABLE "public"."Category" ADD COLUMN "x" text NULL;

ALTER TABLE "public"."Category" ADD COLUMN "y" text NULL;

ALTER TABLE "public"."Category" ADD COLUMN "color" text NULL;

ALTER TABLE "public"."Category" ADD COLUMN "index" integer NULL UNIQUE;
