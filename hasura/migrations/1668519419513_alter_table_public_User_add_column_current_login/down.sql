-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."User" add column "current_login" timestamptz
--  not null default now();

alter table "public"."User" drop column "current_login";
