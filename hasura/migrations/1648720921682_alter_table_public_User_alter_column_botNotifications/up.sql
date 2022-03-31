ALTER TABLE "public"."User" ALTER COLUMN "botNotifications" TYPE boolean;
alter table "public"."User" alter column "botNotifications" set not null;
