-- ============================================================================
-- OUTIL (pas un seed appliqué automatiquement) — LECTURE SEULE.
--
-- Régénère à la main le contenu de N'IMPORTE QUEL seed, au format exact du
-- fichier, en évitant les pièges DBeaver (troncature 200 lignes, export SQL
-- qui ré-emballe les lignes). Chaque requête renvoie UNE cellule = tout le
-- fichier.
--
-- Mode d'emploi (DBeaver) :
--   1. Lancer la requête du seed voulu.
--   2. Ouvrir la cellule dans le panneau *Value* (en bas) → Copy value.
--   3. Écraser le fichier hasura/seeds/<nom>.sql avec la valeur copiée.
--   (À lancer une fois la base à jour, l'export reflète l'état courant.)
--
-- Les tables « entités » (01,02,03,04,05,08,10) ont aussi des scripts
-- scripts/update-*-referentiel.mjs ; ces requêtes en sont l'équivalent manuel.
-- Les tables d'associations (06,07,09) n'ont QUE ces requêtes.
-- ============================================================================


-- ------------------------------------------------------------
-- 01-agencies.sql
-- ------------------------------------------------------------
SELECT 'INSERT INTO "public"."Agency" ("name") VALUES' || E'\n'
     || string_agg(format('(%L)', name), E',\n' ORDER BY name)
     || E'\n ON CONFLICT ("name") DO NOTHING;' AS fichier
  FROM "public"."Agency";


-- ------------------------------------------------------------
-- 02-categories.sql
-- ------------------------------------------------------------
SELECT 'INSERT INTO "public"."Category" VALUES' || E'\n'
     || string_agg(format('(%L, %L, %L, %L, %L, %s)', id, label, x, y, color, index), E',\n' ORDER BY index)
     || E'\n ON CONFLICT ("id") DO UPDATE SET "label" = EXCLUDED."label", "color" = EXCLUDED."color";' AS fichier
  FROM "public"."Category";


-- ------------------------------------------------------------
-- 03-tags.sql
-- ------------------------------------------------------------
SELECT 'INSERT INTO "public"."Tag" ("name") VALUES' || E'\n'
     || string_agg(format('(%L)', name), E',\n' ORDER BY name)
     || E'\n ON CONFLICT ("name") DO NOTHING;' AS fichier
  FROM "public"."Tag";


-- ------------------------------------------------------------
-- 04-topics.sql
-- ------------------------------------------------------------
SELECT 'INSERT INTO "public"."Topic" ("type", "name") VALUES' || E'\n'
     || string_agg(format('(%L, %L)', type, name), E',\n' ORDER BY name)
     || E'\n ON CONFLICT ("name") DO UPDATE SET "type" = EXCLUDED."type";' AS fichier
  FROM "public"."Topic";


-- ------------------------------------------------------------
-- 05-skills.sql
-- ------------------------------------------------------------
SELECT 'INSERT INTO "public"."Skill" ("name", "categoryId", "verified", "description") VALUES ' || E'\n'
     || string_agg(
          format('(%L, %L, %s, %L)', name, "categoryId",
                 CASE WHEN verified THEN 'true' ELSE 'false' END, COALESCE(description, '')),
          E',\n' ORDER BY name)
     || E'\n ON CONFLICT ("name") DO UPDATE SET "categoryId" = EXCLUDED."categoryId", "verified" = true, "description" = EXCLUDED."description";' AS fichier
  FROM "public"."Skill";


-- ------------------------------------------------------------
-- 06-skillTags.sql   (associations Skill <-> Tag, par nom ; séparateur ',')
-- ------------------------------------------------------------
SELECT string_agg(line, E'\n' ORDER BY line) AS fichier FROM (
  SELECT format('INSERT INTO public."SkillTag" SELECT skill.id, tag.id FROM public."Tag" tag JOIN public."Skill" skill ON skill.name=%L WHERE tag.name IN (%s) ON CONFLICT DO NOTHING;',
                s.name, string_agg(quote_literal(t.name), ',' ORDER BY t.name)) AS line
  FROM "public"."Skill" s
  JOIN "public"."SkillTag" st ON st."skillId" = s.id
  JOIN "public"."Tag"       t ON t.id         = st."tagId"
  GROUP BY s.name) q;


-- ------------------------------------------------------------
-- 07-skillTopics.sql   (associations Skill <-> Topic, par nom ; séparateur ', ')
-- ------------------------------------------------------------
SELECT string_agg(line, E'\n' ORDER BY line) AS fichier FROM (
  SELECT format('INSERT INTO public."SkillTopic" SELECT skill.id, topic.id FROM public."Topic" topic JOIN public."Skill" skill ON skill.name=%L WHERE topic.name IN (%s) ON CONFLICT DO NOTHING;',
                s.name, string_agg(quote_literal(t.name), ', ' ORDER BY t.name)) AS line
  FROM "public"."Skill" s
  JOIN "public"."SkillTopic" st ON st."skillId" = s.id
  JOIN "public"."Topic"       t ON t.id         = st."topicId"
  GROUP BY s.name) q;


-- ------------------------------------------------------------
-- 08-certifications.sql   (note : "Certification" SANS préfixe public, comme le seed)
-- ------------------------------------------------------------
SELECT 'INSERT INTO "Certification" ("name", "certBody", "verified") VALUES' || E'\n'
     || string_agg(
          format('(%L, %L, %s)', name, "certBody", CASE WHEN verified THEN 'true' ELSE 'false' END),
          E',\n' ORDER BY name)
     || E'\n ON CONFLICT DO NOTHING;' AS fichier
  FROM "public"."Certification";


-- ------------------------------------------------------------
-- 09-certficationSkills.sql   (associations Certification <-> Skill, par nom ; séparateur ', ')
-- ------------------------------------------------------------
SELECT string_agg(line, E'\n' ORDER BY line) AS fichier FROM (
  SELECT format('INSERT INTO public."CertificationSkill" SELECT certification.id, skill.id FROM public."Certification" certification JOIN public."Skill" skill ON certification.name=%L WHERE skill.name IN (%s) ON CONFLICT DO NOTHING;',
                c.name, string_agg(quote_literal(s.name), ', ' ORDER BY s.name)) AS line
  FROM "public"."Certification" c
  JOIN "public"."CertificationSkill" cs ON cs."certId"  = c.id
  JOIN "public"."Skill"               s ON s.id         = cs."skillId"
  GROUP BY c.name) q;


-- ------------------------------------------------------------
-- 10-role.sql   (un INSERT autonome par rôle)
-- ------------------------------------------------------------
SELECT string_agg(
         format('INSERT INTO "public"."Role" ("name") VALUES (%L) ON CONFLICT ("name") DO NOTHING;', name),
         E'\n' ORDER BY name) AS fichier
  FROM "public"."Role";
