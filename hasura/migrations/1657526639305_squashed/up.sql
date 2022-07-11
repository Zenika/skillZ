
CREATE TABLE "public"."Tag" ("name" text NOT NULL, PRIMARY KEY ("name") , UNIQUE ("name"));

alter table "public"."Tag" add column "id" serial
 not null unique;

BEGIN TRANSACTION;
ALTER TABLE "public"."Tag" DROP CONSTRAINT "Tag_pkey";

ALTER TABLE "public"."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;

CREATE TABLE "public"."SkillTag" ("id" serial NOT NULL, "skillId" uuid NOT NULL, "tagId" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));

alter table "public"."SkillTag" drop constraint "SkillTag_pkey";

alter table "public"."SkillTag" drop column "id" cascade;
