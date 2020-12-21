ALTER TABLE "public"."User" ADD COLUMN "agency" text;
ALTER TABLE "public"."User" ALTER COLUMN "agency" DROP NOT NULL;
