CREATE TABLE "public"."SkillTopic" ("skillId" uuid NOT NULL, "topicId" uuid NOT NULL, PRIMARY KEY ("skillId","topicId") , FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("topicId") REFERENCES "public"."Topic"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("skillId", "topicId"));