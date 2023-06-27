INSERT INTO "public"."Agency" ("name") VALUES
('Bordeaux'),
('Brest'),
('Casablanca'),
('Clermont-Ferrand'),
('Grenoble'),
('La Réunion'),
('Lille'),
('Lyon'),
('Montreal'),
('Nantes'),
('Niort'),
('Paris'),
('Rennes'),
('Singapore'),
('Toronto'),
('Toulouse')
 ON CONFLICT ("name") DO NOTHING;