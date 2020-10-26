
CREATE TABLE "public"."user"("email" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "agencyId" uuid NOT NULL, PRIMARY KEY ("email") );

alter table "public"."user" rename to "User";

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Agency"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, PRIMARY KEY ("id") );

alter table "public"."User"
           add constraint "User_agencyId_fkey"
           foreign key ("agencyId")
           references "public"."Agency"
           ("id") on update cascade on delete restrict;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Skill"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, PRIMARY KEY ("id") );

CREATE TABLE "public"."UserSkill"("userEmail" text NOT NULL, "skillId" uuid NOT NULL, PRIMARY KEY ("userEmail","skillId") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON UPDATE cascade ON DELETE restrict);

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Experience"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "userEmail" text NOT NULL, "name" Text NOT NULL, "description" text NOT NULL, "startDate" date NOT NULL, "endDate" Date, "company" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE cascade ON DELETE cascade);

CREATE TABLE "public"."ExperienceSkill"("experienceId" UUID NOT NULL, "skillId" UUID NOT NULL, PRIMARY KEY ("experienceId","skillId") , FOREIGN KEY ("experienceId") REFERENCES "public"."Experience"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON UPDATE restrict ON DELETE restrict);

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Certification"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" Text NOT NULL, PRIMARY KEY ("id") );

CREATE TABLE "public"."UserCertification"("userEmail" Text NOT NULL, "certificationId" uuid NOT NULL, "personalDeadline" text NOT NULL, "acquiredDate" date NOT NULL, "endDate" date NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("userEmail","certificationId") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE cascade ON DELETE cascade);

CREATE TABLE "public"."TechnicalAppetite"("userEmail" text NOT NULL, "skillId" uuid NOT NULL, "description" text NOT NULL, "creationDate" date NOT NULL, "closed" boolean NOT NULL DEFAULT false, PRIMARY KEY ("userEmail","skillId") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON UPDATE restrict ON DELETE restrict);

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."TechnicalAppetiteStep"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "technicalAppetiteId" uuid NOT NULL, "name" text NOT NULL, "startDate" date, "endDate" date, "order" integer NOT NULL DEFAULT 1, "personalDeadline" text NOT NULL, PRIMARY KEY ("id") ); COMMENT ON TABLE "public"."TechnicalAppetiteStep" IS E'This is meant to track and log efforts to learn a technology, here users can add steps for research, personal project, open source project, etc...';

CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "public"."TechnicalAppetite" ADD COLUMN "technicalAppetiteId" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid();

alter table "public"."TechnicalAppetite" rename column "technicalAppetiteId" to "id";

alter table "public"."TechnicalAppetiteStep"
           add constraint "TechnicalAppetiteStep_technicalAppetiteId_fkey"
           foreign key ("technicalAppetiteId")
           references "public"."TechnicalAppetite"
           ("id") on update cascade on delete cascade;
