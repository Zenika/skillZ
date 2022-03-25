CREATE OR REPLACE VIEW "public"."AgenciesAverageCurrentSkillsAndDesires" AS 
 SELECT "Skill".id AS "skillId",
    "Skill"."categoryId",
    "UserLatestAgency".agency,
    "Skill".name,
    ROUND(avg("UserSkillDesire"."skillLevel"), 2) AS "averageSkillLevel",
    ROUND(avg("UserSkillDesire"."desireLevel"), 2) AS "averageDesireLevel",
    count("UserSkillDesire"."skillLevel") AS "userCount"
   FROM "Skill"
     JOIN "UserSkillDesire" ON "Skill".id = "UserSkillDesire"."skillId"
     JOIN "UserLatestAgency" ON "UserSkillDesire"."userEmail" = "UserLatestAgency"."userEmail"
  WHERE (
            (
              "UserSkillDesire"."userEmail",
              "Skill".name,
              "UserSkillDesire".created_at
            ) IN (
              SELECT
                "UserSkillDesire_1"."userEmail",
                "Skill_1".name,
                max("UserSkillDesire_1".created_at) AS max
              FROM
                (
                  "Skill" "Skill_1"
                  JOIN "UserSkillDesire" "UserSkillDesire_1" ON (("Skill_1".id = "UserSkillDesire_1"."skillId"))
                )
              GROUP BY
                "UserSkillDesire_1"."userEmail",
                "Skill_1".name
            )
        )
  GROUP BY "Skill".id, "UserLatestAgency".agency
  ORDER BY (avg("UserSkillDesire"."skillLevel") + avg("UserSkillDesire"."skillLevel")) DESC;
