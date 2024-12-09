INSERT INTO "public"."Role" ("name") VALUES
('Developer / Engineer'),
('Technical Lead'),
('Solution Architect'),
('Technical Expert / Specialist'),
('Product Owner'),
('Product Manager'),
('UX Designer'),
('Engineering Manager'),
('Delivery Manager'),
('Coach (team, organisation)'),
('Consultant')
 ON CONFLICT ("name") DO NOTHING;