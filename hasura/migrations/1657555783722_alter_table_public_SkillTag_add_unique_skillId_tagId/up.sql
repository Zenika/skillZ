alter table "public"."SkillTag" add constraint "SkillTag_skillId_tagId_key" unique ("skillId", "tagId");
