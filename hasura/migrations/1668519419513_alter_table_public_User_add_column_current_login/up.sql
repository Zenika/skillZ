alter table "public"."User" add column "current_login" timestamptz
 not null default now();
