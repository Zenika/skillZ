CREATE OR REPLACE VIEW "public"."UsersCurrentSkillsAndDesires" AS 
 SELECT "Skill".id AS "skillId",
    "Skill"."categoryId",
    "UserSkillDesire"."userEmail",
    "Skill".name,
    "UserSkillDesire"."skillLevel",
    "UserSkillDesire"."desireLevel",
    "UserSkillDesire".created_at,
    "UserSkillDesire".updated_at
   FROM (("Skill"
     JOIN "UserSkillDesire" ON (("Skill".id = "UserSkillDesire"."skillId")))
     JOIN ( SELECT "UserSkillDesire_1"."userEmail",
            "UserSkillDesire_1"."skillId",
            max("UserSkillDesire_1".created_at) AS created_at
           FROM "UserSkillDesire" "UserSkillDesire_1"
          GROUP BY "UserSkillDesire_1"."userEmail", "UserSkillDesire_1"."skillId") "Source" ON ((("UserSkillDesire"."skillId" = "Source"."skillId") AND ("UserSkillDesire"."userEmail" = "Source"."userEmail") AND ("UserSkillDesire".created_at = "Source".created_at))))
  ORDER BY "UserSkillDesire".created_at DESC;
