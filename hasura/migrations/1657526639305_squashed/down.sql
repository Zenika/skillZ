
alter table "public"."SkillTag" alter column "id" set default nextval('"SkillTag_id_seq"'::regclass);
alter table "public"."SkillTag" alter column "id" drop not null;
alter table "public"."SkillTag" add column "id" int4;

alter table "public"."SkillTag"
    add constraint "SkillTag_pkey"
    primary key ("id");

DROP TABLE "public"."SkillTag";

alter table "public"."Tag" drop constraint "Tag_pkey";
alter table "public"."Tag"
    add constraint "Tag_pkey"
    primary key ("name");

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."Tag" add column "id" serial
--  not null unique;

DROP TABLE "public"."Tag";
