alter table "public"."User" alter column "id" set default gen_random_uuid();
alter table "public"."User" add constraint "User_id_key" unique (id);
alter table "public"."User" alter column "id" drop not null;
alter table "public"."User" add column "id" uuid;
