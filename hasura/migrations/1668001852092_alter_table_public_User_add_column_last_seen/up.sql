alter table "public"."User" add column "last_seen" timestamp
 not null default now();
