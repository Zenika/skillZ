alter table "public"."User" alter column "botNotifications" drop not null;
ALTER TABLE "public"."User" ALTER COLUMN "botNotifications" TYPE boolean;
