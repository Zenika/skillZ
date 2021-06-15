CREATE TABLE "public"."UserSkillDesire"("id" uuid NOT NULL DEFAULT gen_random_uuid(),"userEmail" text NOT NULL, "skillId" uuid NOT NULL, "skillLevel" integer NOT NULL, "desireLevel" integer NOT NULL, "created_at" date NOT NULL DEFAULT now(), PRIMARY KEY ("id","userEmail","skillId") , UNIQUE ("userEmail", "skillId", "created_at"));