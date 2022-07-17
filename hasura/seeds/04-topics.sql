INSERT INTO "public"."Topic" ("type", "name") VALUES
('domain', 'Delivery'),
('domain', 'Product'),
('domain', 'Infrastructure / Ops'),
('domain', 'Data engineering'),
('domain', 'Frontend (UI)'),
('domain', 'Backend (servers)'),
('domain', 'Data Science / Analytics'),
('domain', 'Quality assurance'),
('sensitivity', 'Architecture'),
('sensitivity', 'DevOps'),
('sensitivity', 'Green'),
('sensitivity', 'Management'),
('sensitivity', 'Cloud'),
('sensitivity', 'Agile'),
('sensitivity', 'Craftsmanship'),
('sensitivity', 'Security'),
('sensitivity', 'Facilitation'),
('sensitivity', 'Development process'),
('generic', 'Business'),
('generic', 'Professional behavior'),
('generic', 'Spoken language'),
('generic', 'Programming language')
ON CONFLICT ("name") DO UPDATE SET "type" = EXCLUDED."type";

DELETE FROM "public"."UserTopic" WHERE "topicId" IN 
(SELECT "id" FROM "public"."Topic" WHERE "type" IS NULL);
DELETE FROM "public"."Topic" WHERE "type" IS NULL;