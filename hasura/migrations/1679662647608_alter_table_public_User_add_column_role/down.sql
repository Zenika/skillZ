-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."User" add column "role" Text
--  not null default 'world';
alter table "public"."User" drop column if exists "role";