alter table "public"."UserSkillDesire"
           add constraint "UserSkillDesire_userEmail_fkey"
           foreign key ("userEmail")
           references "public"."User"
           ("email") on update cascade on delete cascade;
