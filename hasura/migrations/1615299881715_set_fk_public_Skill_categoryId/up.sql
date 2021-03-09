alter table "public"."Skill"
           add constraint "Skill_categoryId_fkey"
           foreign key ("categoryId")
           references "public"."Category"
           ("id") on update restrict on delete restrict;
