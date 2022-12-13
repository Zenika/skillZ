-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."UserSkillDesire" add column "updated_at" date
--  not null default now();
alter table "public"."UserSkillDesire" drop column if exists "updated_at";
