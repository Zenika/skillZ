alter table "public"."Achievement"
           add constraint "Achievement_achievementCategoryId_fkey"
           foreign key ("achievementCategoryId")
           references "public"."AchievementCategory"
           ("id") on update restrict on delete restrict;
