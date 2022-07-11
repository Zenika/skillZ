alter table "public"."SkillTag" alter column "id" set default nextval('"SkillTag_id_seq"'::regclass);
alter table "public"."SkillTag" alter column "id" drop not null;
alter table "public"."SkillTag" add column "id" int4;
