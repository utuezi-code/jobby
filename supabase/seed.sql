-- ════════════════════════════════════════════════════════════
--  VITIB Seed Data
-- ════════════════════════════════════════════════════════════

-- Interests reference data
INSERT INTO interests (slug, label, sort_order) VALUES
  ('ia',             'Intelligence Artificielle', 1),
  ('cybersecurite',  'Cybersécurité',             2),
  ('data',           'Data & Analytique',         3),
  ('entrepreneuriat','Entrepreneuriat',            4),
  ('innovation',     'Innovation',                5),
  ('formation',      'Formation continue',        6),
  ('autre',          'Autre',                     7)
ON CONFLICT (slug) DO NOTHING;
