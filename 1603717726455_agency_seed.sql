CREATE TABLE "public"."User"("email" text NOT NULL, "agencyId" uuid NOT NULL, PRIMARY KEY ("email") );

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Skill"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, PRIMARY KEY ("id") );

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Topic"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, PRIMARY KEY ("id") );

ALTER TABLE "public"."Skill" ADD COLUMN "topicId" uuid NOT NULL;

alter table "public"."Skill"
           add constraint "Skill_topicId_fkey"
           foreign key ("topicId")
           references "public"."Topic"
           ("id") on update restrict on delete restrict;

CREATE TABLE "public"."UserSkill"("userEmail" text NOT NULL, "skillId" UUID NOT NULL, PRIMARY KEY ("userEmail","skillId") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON UPDATE restrict ON DELETE restrict);

ALTER TABLE "public"."UserSkill" ADD COLUMN "level" integer NOT NULL DEFAULT 1;

ALTER TABLE "public"."UserSkill" ADD COLUMN "created_at" date NOT NULL DEFAULT now();

alter table "public"."UserSkill" drop constraint "UserSkill_pkey";
alter table "public"."UserSkill"
    add constraint "UserSkill_pkey" 
    primary key ( "userEmail", "skillId", "created_at" );

alter table "public"."UserSkill" add constraint "UserSkill_level_between_1_and_5" check (level >= 1 AND level <= 5);

CREATE TABLE "public"."TechnicalAppetite"("userEmail" text NOT NULL, "skillId" uuid NOT NULL, "created_at" date NOT NULL DEFAULT now(), "level" integer NOT NULL DEFAULT 1, PRIMARY KEY ("userEmail","skillId","created_at") , FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON UPDATE restrict ON DELETE restrict, CONSTRAINT "TechnicalAppetite_level_between_1_and_5" CHECK (level >= 1 AND level <= 5));

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Agency"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, PRIMARY KEY ("id") );

alter table "public"."User"
           add constraint "User_agencyId_fkey"
           foreign key ("agencyId")
           references "public"."Agency"
           ("id") on update restrict on delete restrict;


INSERT INTO public."Agency" (id, name) VALUES ('193743a5-ae7a-4fe2-9c15-0257c8eb3ca6', 'Paris');
INSERT INTO public."Agency" (id, name) VALUES ('16ed885a-2c59-4d3c-959c-cdda64635cf2', 'Nantes');
INSERT INTO public."Agency" (id, name) VALUES ('0be4a679-928b-4cc6-8a9d-f641608ad825', 'Singapore');
INSERT INTO public."Agency" (id, name) VALUES ('5d9c9535-ea37-456d-ad90-bdd7b7370673', 'Bordeaux');
INSERT INTO public."Agency" (id, name) VALUES ('5e1301b0-8e5d-4ba4-9673-d2b874c0b749', 'Brest');
INSERT INTO public."Agency" (id, name) VALUES ('205cb3f5-f970-426c-a839-26928ab7a0d7', 'Montréal');
INSERT INTO public."Agency" (id, name) VALUES ('fbb7ba59-d273-44b7-885b-813a33701441', 'Grenoble');
INSERT INTO public."Agency" (id, name) VALUES ('529d3316-8d0c-4630-a7a0-6c7e6e083e3e', 'Lyon');
INSERT INTO public."Agency" (id, name) VALUES ('37151f04-b718-401c-a057-4ee9e509038b', 'Rennes');
INSERT INTO public."Agency" (id, name) VALUES ('1ccbb30b-93ab-472c-a51d-a16e2eb68641', 'Lille');
