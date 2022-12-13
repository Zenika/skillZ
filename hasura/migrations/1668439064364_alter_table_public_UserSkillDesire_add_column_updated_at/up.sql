alter table "public"."UserSkillDesire" add column "updated_at" date
 not null default now();
