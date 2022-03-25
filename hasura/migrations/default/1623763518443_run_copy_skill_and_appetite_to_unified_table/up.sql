insert into "public"."UserSkillDesire"("userEmail", "skillId", "skillLevel", "desireLevel", "created_at") (
    select "UserSkill"."userEmail",
            "UserSkill"."skillId",
            "UserSkill"."level",
            "TechnicalAppetite"."level",
            "UserSkill"."created_at"
    from "public"."UserSkill" 
        join "public"."TechnicalAppetite" 
            on "UserSkill"."userEmail" = "TechnicalAppetite"."userEmail"
            and "UserSkill"."skillId" = "TechnicalAppetite"."skillId"
            and "UserSkill"."created_at" = "TechnicalAppetite"."created_at"
);
