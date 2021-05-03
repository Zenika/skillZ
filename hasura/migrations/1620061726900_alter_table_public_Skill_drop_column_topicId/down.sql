ALTER TABLE "public"."Skill" ADD COLUMN "topicId" uuid;
ALTER TABLE "public"."Skill" ALTER COLUMN "topicId" DROP NOT NULL;
ALTER TABLE "public"."Skill" ADD CONSTRAINT Skill_topicId_fkey FOREIGN KEY (topicId) REFERENCES "public"."Topic" (id) ON DELETE restrict ON UPDATE restrict;
