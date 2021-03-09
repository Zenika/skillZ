CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Category"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "label" text NOT NULL, PRIMARY KEY ("id") );
