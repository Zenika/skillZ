CREATE OR REPLACE VIEW "public"."UsersCurrentSkillsAndDesires" AS 
 SELECT
    "Skill"."id" AS "skillId",
    "Skill"."categoryId",
    "UserSkill"."userEmail",
    "Skill"."name",
    "UserSkill"."level",
    "TechnicalAppetite"."level" AS "desire",
    "UserSkill"."created_at"
FROM
    "Skill"
    JOIN 
    ("UserSkill" JOIN "TechnicalAppetite" 
        ON "UserSkill"."skillId" = "TechnicalAppetite"."skillId" 
        AND "UserSkill"."userEmail" = "TechnicalAppetite"."userEmail"
        AND "UserSkill"."created_at" = "TechnicalAppetite"."created_at"
    ) ON "Skill".id = "UserSkill"."skillId"
    JOIN (
        SELECT
            "UserSkill"."userEmail",
            "Skill"."id",
            max("UserSkill"."created_at") AS "created_at"
        FROM
            "Skill"
            JOIN 
            ("UserSkill" JOIN "TechnicalAppetite" 
                ON "UserSkill"."skillId" = "TechnicalAppetite"."skillId" 
                AND "UserSkill"."userEmail" = "TechnicalAppetite"."userEmail"
                AND "UserSkill"."created_at" = "TechnicalAppetite"."created_at"
            ) ON "Skill".id = "UserSkill"."skillId"
        GROUP BY "UserSkill"."userEmail","Skill"."id"
    ) AS "Source" 
        ON "UserSkill"."skillId" = "Source"."id" 
        AND "UserSkill"."userEmail" = "Source"."userEmail"
        AND "UserSkill"."created_at" = "Source"."created_at"
ORDER BY "UserSkill"."created_at" DESC;
