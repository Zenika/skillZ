alter table "public"."UserNotifications" alter column "notification_id" drop not null;
alter table "public"."UserNotifications" add column "notification_id" uuid;
