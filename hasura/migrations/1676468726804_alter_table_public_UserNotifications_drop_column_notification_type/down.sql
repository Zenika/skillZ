alter table "public"."UserNotifications" alter column "notification_type" drop not null;
alter table "public"."UserNotifications" add column "notification_type" text;
