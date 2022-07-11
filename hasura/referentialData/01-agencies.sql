INSERT INTO "public"."Agency" ("name") VALUES
('Paris'),
('Nantes'),
('Bordeaux'),
('Brest'),
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
