ALTER TABLE "public"."UserTopic" ADD COLUMN "level" int4;
ALTER TABLE "public"."UserTopic" ALTER COLUMN "level" DROP NOT NULL;
ALTER TABLE "public"."UserTopic" ALTER COLUMN "level" SET DEFAULT 1;
