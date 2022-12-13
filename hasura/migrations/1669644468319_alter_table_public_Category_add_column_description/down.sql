-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."Category" add column "description" text
--  null;

alter table "public"."Category" drop column if exists "description";
