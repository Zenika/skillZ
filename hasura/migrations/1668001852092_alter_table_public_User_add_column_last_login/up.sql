alter table "public"."User" add column "last_login" timestamptz
 not null default now();
