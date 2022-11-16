-- Migrations exists instead of seeds
INSERT INTO "public"."Agency" ("name") VALUES
('Paris'),
('Nantes'),
('Bordeaux'),
('Toulouse'),
('Brest'),
('La Réunion'),
('Grenoble'),
('Lyon'),
('Rennes'),
('Lille'),
('Niort'),
('Clermont-Ferrand'),
('Singapore'),
('Montreal'),
('Toronto'),
('Casablanca')
ON CONFLICT ("name") DO NOTHING;
