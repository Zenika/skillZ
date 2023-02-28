CREATE OR REPLACE VIEW "public"."ZenikasAverageCurrentSkillsAndDesires" AS 
 SELECT "Skill".id AS "skillId",
    "Skill"."categoryId",
    "Skill".name,
    avg("UserSkillDesire"."skillLevel") AS "averageSkillLevel",
    avg("UserSkillDesire"."desireLevel") AS "averageDesireLevel",
    count("UserSkillDesire"."userEmail") AS "userCount"
   FROM ("Skill"
     LEFT JOIN "UserSkillDesire" ON (("Skill".id = "UserSkillDesire"."skillId")))
  GROUP BY "Skill".id
  ORDER BY (avg("UserSkillDesire"."skillLevel") + avg("UserSkillDesire"."desireLevel")) DESC;
