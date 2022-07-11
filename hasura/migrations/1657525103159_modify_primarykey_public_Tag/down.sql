alter table "public"."Tag" drop constraint "Tag_pkey";
alter table "public"."Tag"
    add constraint "Tag_pkey"
    primary key ("name");
