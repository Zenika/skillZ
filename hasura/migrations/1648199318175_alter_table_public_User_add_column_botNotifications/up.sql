alter table "public"."User" add column if not exists "botNotifications" boolean
 not null default 'false';
