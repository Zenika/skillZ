alter table "public"."SkillTopic" drop constraint "SkillTopic_skillId_fkey",
  add constraint "SkillTopic_skillId_fkey"
  foreign key ("skillId")
  references "public"."Skill"
  ("id") on update restrict on delete cascade;
