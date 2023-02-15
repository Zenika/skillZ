alter table "public"."UserNotifications" add column "created_at" date
 not null default now();
