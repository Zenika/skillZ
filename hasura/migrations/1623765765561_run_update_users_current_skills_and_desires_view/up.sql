CREATE OR REPLACE VIEW "public"."ZenikasAverageCurrentSkillsAndDesires" AS 
 SELECT "Skill".id AS "skillId",
    "Skill"."categoryId",
    "Skill"."name",
    avg("UserSkillDesire"."skillLevel") AS "averageSkillLevel",
    avg("UserSkillDesire"."desireLevel") AS "averageDesireLevel",
    count("UserSkillDesire"."userEmail") AS "userCount"
   FROM "Skill"
     JOIN "UserSkillDesire" ON "Skill".id = "UserSkillDesire"."skillId"
  WHERE ("UserSkillDesire"."userEmail", "Skill"."name", "UserSkillDesire"."created_at") IN 
    ( SELECT "UserSkillDesire_1"."userEmail",
            "Skill_1"."name",
            max("UserSkillDesire_1"."created_at") AS max
           FROM "Skill" "Skill_1"
             JOIN "UserSkillDesire" "UserSkillDesire_1" ON "Skill_1"."id" = "UserSkillDesire_1"."skillId"
          GROUP BY "UserSkillDesire_1"."userEmail", "Skill_1"."name"
    )
  GROUP BY "Skill"."id"
  ORDER BY (avg("UserSkillDesire"."skillLevel") + avg("UserSkillDesire"."desireLevel")) DESC;
