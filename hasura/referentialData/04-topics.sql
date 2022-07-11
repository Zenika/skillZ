INSERT INTO "public"."Topic" ("type", "name") VALUES
('domain', 'Delivery'),
('domain', 'Product'),
('domain', 'Organization transformation'),
('domain', 'Infrastructure / Ops'),
('domain', 'Data Engineering'),
('domain', 'Frontend (UI)'),
('domain', 'Backend (servers)'),
('domain', 'Data Science / Analytics'),
('sensitivity', 'Architecture'),
('sensitivity', 'DevOps'),
('sensitivity', 'Green'),
('sensitivity', 'Management'),
('sensitivity', 'Cloud'),
('sensitivity', 'Agile'),
('sensitivity', 'Craftsmanship'),
('sensitivity', 'Cybersecurity'),
('sensitivity', 'Facilitation'),
('sensitivity', 'Development process')
ON CONFLICT ("name") DO UPDATE SET "type" = EXCLUDED."type";

DELETE FROM "public"."UserTopic" WHERE "topicId" IN 
(SELECT "id" FROM "public"."Topic" WHERE "type" IS NULL);
DELETE FROM "public"."Topic" WHERE "type" IS NULL;