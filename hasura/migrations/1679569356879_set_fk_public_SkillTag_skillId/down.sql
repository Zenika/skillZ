alter table "public"."SkillTag" drop constraint "SkillTag_skillId_fkey",
  add constraint "SkillTag_skillId_fkey"
  foreign key ("skillId")
  references "public"."Skill"
  ("id") on update restrict on delete restrict;
