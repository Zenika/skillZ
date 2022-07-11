INSERT INTO public."Category" VALUES
('89780de3-4a4c-40c2-bcdf-b5d15a48437a', 'practices', 'left', 'top', 'green', 1),
('06420261-3e78-4a91-bc6a-1a52cad5d6a1', 'activities', 'right', 'top', 'red', 2),
('c3341edb-3c1f-4e3d-bf89-8e795eb13690', 'knowledge', 'left' ,'bot', 'blue', 3),
('89f5e9a5-5ce6-416c-bed9-dd736546aa7f', 'behaviors', 'right', 'bot', 'yellow', 4)
ON CONFLICT ("id") DO UPDATE SET "label" = EXCLUDED."label", "color" = EXCLUDED."color";