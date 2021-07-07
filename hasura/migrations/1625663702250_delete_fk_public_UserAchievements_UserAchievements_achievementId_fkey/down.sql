alter table "public"."UserAchievements" add foreign key ("achievementId") references "public"."Achievement"("id") on update cascade on delete cascade;
