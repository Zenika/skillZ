alter table "public"."UserSkillDesire" alter column "updated_at" set default now();
alter table "public"."UserSkillDesire" alter column "updated_at" drop not null;
alter table "public"."UserSkillDesire" add column "updated_at" date;
