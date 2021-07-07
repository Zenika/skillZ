alter table "public"."Achievement" add foreign key ("achievementCategoryId") references "public"."AchievementCategory"("id") on update restrict on delete restrict;
