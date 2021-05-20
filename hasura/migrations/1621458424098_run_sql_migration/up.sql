CREATE OR REPLACE VIEW "public"."UserLatestAgency" AS 
    SELECT
        "userEmail",
        "agency"
    FROM
        "UserAgency"
    WHERE
        ("userEmail", "created_at") IN (SELECT "userEmail", max("created_at") FROM "UserAgency" GROUP BY "userEmail")