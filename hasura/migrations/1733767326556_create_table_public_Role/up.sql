CREATE TABLE "public"."Role" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("name"));COMMENT ON TABLE "public"."Role" IS E'Role for a user';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
