alter table "public"."UserSkillDesire"
           add constraint "UserSkillDesire_skillId_fkey"
           foreign key ("skillId")
           references "public"."Skill"
           ("id") on update cascade on delete cascade;
