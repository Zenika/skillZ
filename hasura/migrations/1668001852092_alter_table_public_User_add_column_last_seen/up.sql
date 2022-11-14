alter table "public"."User" add column "last_seen" timestamptz
 not null default now();
