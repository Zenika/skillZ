alter table "public"."CertificationSkill" drop constraint "CertificationSkill_skillId_fkey",
  add constraint "CertificationSkill_skillId_fkey"
  foreign key ("skillId")
  references "public"."Skill"
  ("id") on update restrict on delete restrict;
