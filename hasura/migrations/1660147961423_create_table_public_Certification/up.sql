CREATE TABLE "public"."Certification" ("id" serial NOT NULL, "name" text NOT NULL, "certBody" text NOT NULL, "verified" boolean NOT NULL, PRIMARY KEY ("id") , UNIQUE ("name"), UNIQUE ("id"));
