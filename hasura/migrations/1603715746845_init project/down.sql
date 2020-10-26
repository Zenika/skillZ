
alter table "public"."TechnicalAppetiteStep" drop constraint "TechnicalAppetiteStep_technicalAppetiteId_fkey";

alter table "public"."TechnicalAppetite" rename column "id" to "technicalAppetiteId";

ALTER TABLE "public"."TechnicalAppetite" DROP COLUMN "technicalAppetiteId";

DROP TABLE "public"."TechnicalAppetiteStep";

DROP TABLE "public"."TechnicalAppetite";

DROP TABLE "public"."UserCertification";

DROP TABLE "public"."Certification";

DROP TABLE "public"."ExperienceSkill";

DROP TABLE "public"."Experience";

DROP TABLE "public"."UserSkill";

DROP TABLE "public"."Skill";

alter table "public"."User" drop constraint "User_agencyId_fkey";

DROP TABLE "public"."Agency";

alter table "public"."User" rename to "user";

DROP TABLE "public"."user";
