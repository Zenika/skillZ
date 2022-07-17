CREATE TABLE "public"."User"("email" text NOT NULL, "name" text NOT NULL, "picture" text NOT NULL, PRIMARY KEY ("email") );

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Skill"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL UNIQUE, "categoryId" uuid NOT NULL, PRIMARY KEY ("id") );

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Topic"("id" uuid NOT NULL DEFAULT gen_random_uuid(),  "name" text NOT NULL UNIQUE, PRIMARY KEY ("id") );

CREATE TABLE "public"."UserSkill"("userEmail" text NOT NULL, "skillId" UUID NOT NULL, "level" integer NOT NULL DEFAULT 1, "created_at" date NOT NULL DEFAULT now(), PRIMARY KEY ("userEmail","skillId","created_at") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON UPDATE restrict ON DELETE restrict);

alter table "public"."UserSkill" add constraint "UserSkill_level_between_1_and_5" check (level >= 1 AND level <= 5);

CREATE TABLE "public"."TechnicalAppetite"("userEmail" text NOT NULL, "skillId" uuid NOT NULL, "created_at" date NOT NULL DEFAULT now(), "level" integer NOT NULL DEFAULT 1, PRIMARY KEY ("userEmail","skillId","created_at") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON UPDATE restrict ON DELETE restrict, CONSTRAINT "TechnicalAppetite_level_between_1_and_5" CHECK (level >= 1 AND level <= 5));

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Agency"("name" text NOT NULL, PRIMARY KEY ("name") );

CREATE TABLE "public"."UserAgency"("userEmail" Text NOT NULL, "agency" text NOT NULL, "created_at" date NOT NULL DEFAULT now(), PRIMARY KEY ("userEmail", "created_at") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("agency") REFERENCES "public"."Agency"("name") ON UPDATE restrict ON DELETE restrict);

CREATE TABLE "public"."UserTopic"("userEmail" text NOT NULL, "topicId" uuid NOT NULL, "created_at" date NOT NULL DEFAULT now(), PRIMARY KEY ("userEmail","topicId","created_at") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("topicId") REFERENCES "public"."Topic"("id") ON UPDATE restrict ON DELETE restrict);

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Category"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "label" text NOT NULL, "x" text NOT NULL, "y" text NOT NULL, "color" text NOT NULL, "index" integer NOT NULL UNIQUE, PRIMARY KEY ("id") );

alter table "public"."Skill"
           add constraint "Skill_categoryId_fkey"
           foreign key ("categoryId")
           references "public"."Category"
           ("id") on update restrict on delete restrict;
