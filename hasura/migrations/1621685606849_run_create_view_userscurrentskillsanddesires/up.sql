CREATE OR REPLACE VIEW "public"."UsersCurrentSkillsAndDesires" AS 
    SELECT "Skill"."id" AS "skillId","Skill"."categoryId","UserSkill"."userEmail", "name", "UserSkill"."level" AS "level", "TechnicalAppetite"."level" AS "desire"
    FROM "public"."Skill" 
        INNER JOIN "public"."UserSkill" ON "Skill"."id" = "UserSkill"."skillId"
        INNER JOIN "public"."TechnicalAppetite" ON "Skill"."id" = "TechnicalAppetite"."skillId"
    WHERE ("UserSkill"."userEmail","name", "UserSkill"."created_at", "TechnicalAppetite"."created_at") IN (
        SELECT "UserSkill"."userEmail","name", max("UserSkill"."created_at"), max("TechnicalAppetite"."created_at")
            FROM "public"."Skill" 
                INNER JOIN "public"."UserSkill" ON "Skill"."id" = "UserSkill"."skillId"
                INNER JOIN "public"."TechnicalAppetite" ON "Skill"."id" = "TechnicalAppetite"."skillId"
            GROUP BY "UserSkill"."userEmail","name"
    )
    ORDER BY "level" DESC, "desire" DESC;
