INSERT INTO "public"."Topic" ("type", "name") VALUES
('sensitivity', 'Agile'),
('sensitivity', 'Architecture'),
('sensitivity', 'Artificial Intelligence'),
('domain', 'Backend (servers)'),
('generic', 'Business'),
('sensitivity', 'Cloud'),
('sensitivity', 'Craftsmanship'),
('domain', 'Data engineering'),
('domain', 'Data Science / Analytics'),
('domain', 'Delivery'),
('sensitivity', 'Design'),
('sensitivity', 'Development process'),
('sensitivity', 'DevOps'),
('domain', 'Frontend (UI)'),
('sensitivity', 'Green'),
('domain', 'Infrastructure / Ops'),
('sensitivity', 'Management'),
('domain', 'Organization / Collaboration'),
('domain', 'Product'),
('generic', 'Professional behavior'),
('generic', 'Programming language'),
('domain', 'Quality assurance'),
('sensitivity', 'Security'),
('generic', 'Spoken language')
 ON CONFLICT ("name") DO UPDATE SET "type" = EXCLUDED."type";

DELETE FROM "public"."UserTopic" WHERE "topicId" IN (SELECT "id" FROM "public"."Topic" WHERE "type" IS NULL);
DELETE FROM "public"."Topic" WHERE "type" IS NULL;
