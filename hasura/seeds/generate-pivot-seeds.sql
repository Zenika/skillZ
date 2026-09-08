-- ============================================================
-- OUTIL (pas un seed appliqué automatiquement).
--
-- Régénère le contenu des seeds des tables d'ASSOCIATIONS qui n'ont
-- aucun script d'export dans le workflow update-referentials :
--   * 06-skillTags.sql          (Skill <-> Tag)
--   * 07-skillTopics.sql        (Skill <-> Topic)
--   * 09-certficationSkills.sql (Certification <-> Skill)
--
-- Chaque requête renvoie une colonne "line" = le contenu exact du
-- fichier seed correspondant (1 INSERT par ligne), au format identique
-- aux seeds existants (séparateur ',' pour 06, ', ' pour 07 et 09).
-- Ces requêtes sont en LECTURE SEULE (SELECT) : sans effet si jamais
-- appliquées par erreur.
--
-- Mode d'emploi (DBeaver) :
--   1. Lancer la requête voulue.
--   2. Exporter le résultat en TEXTE, SANS en-tête de colonne ni
--      guillemets (Export resultset -> CSV/Text, décocher "column
--      headers", désactiver le quoting, délimiteur = saut de ligne).
--   3. Écraser le fichier seed correspondant avec la sortie.
--
-- À lancer une fois la base à jour (renommages, dédup, nettoyage des
-- tags, rôles…) pour que les seeds régénérés soient cohérents.
-- ============================================================


-- ------------------------------------------------------------
-- 06-skillTags.sql   (séparateur des tags : ','  sans espace)
-- ------------------------------------------------------------
SELECT format(
  'INSERT INTO public."SkillTag" SELECT skill.id, tag.id FROM public."Tag" tag JOIN public."Skill" skill ON skill.name=%L WHERE tag.name IN (%s) ON CONFLICT DO NOTHING;',
  s.name,
  string_agg(quote_literal(t.name), ',' ORDER BY t.name)
) AS line
  FROM "public"."Skill"    s
  JOIN "public"."SkillTag" st ON st."skillId" = s.id
  JOIN "public"."Tag"       t ON t.id         = st."tagId"
 GROUP BY s.name
 ORDER BY s.name;


-- ------------------------------------------------------------
-- 07-skillTopics.sql   (séparateur des topics : ', '  avec espace)
-- ------------------------------------------------------------
SELECT format(
  'INSERT INTO public."SkillTopic" SELECT skill.id, topic.id FROM public."Topic" topic JOIN public."Skill" skill ON skill.name=%L WHERE topic.name IN (%s) ON CONFLICT DO NOTHING;',
  s.name,
  string_agg(quote_literal(t.name), ', ' ORDER BY t.name)
) AS line
  FROM "public"."Skill"      s
  JOIN "public"."SkillTopic" st ON st."skillId" = s.id
  JOIN "public"."Topic"       t ON t.id         = st."topicId"
 GROUP BY s.name
 ORDER BY s.name;


-- ------------------------------------------------------------
-- 09-certficationSkills.sql   (séparateur des skills : ', '  avec espace)
-- ------------------------------------------------------------
SELECT format(
  'INSERT INTO public."CertificationSkill" SELECT certification.id, skill.id FROM public."Certification" certification JOIN public."Skill" skill ON certification.name=%L WHERE skill.name IN (%s) ON CONFLICT DO NOTHING;',
  c.name,
  string_agg(quote_literal(s.name), ', ' ORDER BY s.name)
) AS line
  FROM "public"."Certification"      c
  JOIN "public"."CertificationSkill" cs ON cs."certId"  = c.id
  JOIN "public"."Skill"               s ON s.id         = cs."skillId"
 GROUP BY c.name
 ORDER BY c.name;
