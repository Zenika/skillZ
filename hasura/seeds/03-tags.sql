INSERT INTO "public"."Tag" ("name") VALUES
('cloud'),
('craftsmanship'),
('management'),
('organization'),
('agile'),
('product'),
('data'),
('kafka'),
('field'),
('web'),
('frontend'),
('backend'),
('devops'),
('kubernetes'),
('containers'),
('coaching'),
('qa'),
('design'),
('facilitation'),
('security'),
('hardening'),
('network'),
('delivery'),
('sales'),
('research'),
('consulting'),
('programming'),
('java'),
('integrity'),
('confidentiality'),
('availability'),
('governance'),
('modeling'),
('auditing'),
('crisismanagement'),
('analytics'),
('ml'),
('testing'),
('behavior'),
('strength'),
('execution'),
('influence'),
('relations'),
('strategy'),
('transformation'),
('architecture'),
('lean'),
('ai'),
('database'),
('ux'),
('ias'),
('api'),
('sre'),
('paradigm'),
('framework'),
('language'),
('greenit'),
('blockchain'),
('tooling'),
('platform'),
('middleware'),
('scala'),
('search'),
('php'),
('cms'),
('virtualization'),
('bi'),
('os'),
('business'),
('field'),
('organization'),
('elastic'),
('nosql'),
('graph'),
('python'),
('mobile'),
('desktop'),
('docker'),
('monitoring'),
('repository'),
('artifacts'),
('identity'),
('appliance'),
('ide'),
('whiteboard')
ON CONFLICT ("name") DO NOTHING;
