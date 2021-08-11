alter table "public"."UserAchievements" drop constraint "UserAchievements_pkey";
alter table "public"."UserAchievements"
    add constraint "UserAchievements_pkey" 
    primary key ( "achievementLabel", "userEmail" );
