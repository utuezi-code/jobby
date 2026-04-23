-- ════════════════════════════════════════════════════════════
--  VITIB Digital Academy – Lead Capture Schema
--  FEMUA 2026
-- ════════════════════════════════════════════════════════════

-- ── Extensions ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── interests ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS interests (
  id          UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT    NOT NULL UNIQUE,
  label       TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ── leads ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  nom         TEXT        NOT NULL CHECK (length(trim(nom)) >= 2),
  prenom      TEXT        NOT NULL CHECK (length(trim(prenom)) >= 2),
  telephone   TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  structure   TEXT,
  fonction    TEXT,
  profil      TEXT        NOT NULL CHECK (profil IN (
                'etudiant','professionnel','entrepreneur','formateur',
                'partenaire','institution','entreprise','autre'
              )),
  message     TEXT,
  consent     BOOLEAN     NOT NULL DEFAULT FALSE,
  status      TEXT        NOT NULL DEFAULT 'nouveau' CHECK (status IN (
                'nouveau','a_relancer','relance','partenaire_potentiel','prioritaire'
              )),
  source      TEXT        NOT NULL DEFAULT 'FEMUA 2026',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique email index (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS leads_email_lower_idx
  ON leads (lower(email));

-- ── lead_interests ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lead_interests (
  lead_id     UUID NOT NULL REFERENCES leads(id)     ON DELETE CASCADE,
  interest_id UUID NOT NULL REFERENCES interests(id) ON DELETE CASCADE,
  PRIMARY KEY (lead_id, interest_id)
);

-- ── quiz_attempts ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id         UUID        REFERENCES leads(id) ON DELETE SET NULL,
  score           INTEGER     NOT NULL DEFAULT 0 CHECK (score >= 0),
  total_questions INTEGER     NOT NULL DEFAULT 5,
  answers         JSONB       NOT NULL DEFAULT '[]',
  session_token   TEXT,
  completed       BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS quiz_attempts_session_token_idx
  ON quiz_attempts (session_token)
  WHERE session_token IS NOT NULL;

CREATE INDEX IF NOT EXISTS quiz_attempts_lead_id_idx
  ON quiz_attempts (lead_id)
  WHERE lead_id IS NOT NULL;

-- ── admin_notes ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_notes (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id      UUID        NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  note         TEXT        NOT NULL CHECK (length(trim(note)) >= 1),
  author_email TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_notes_lead_id_idx
  ON admin_notes (lead_id);

-- ── updated_at trigger ───────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY
-- ════════════════════════════════════════════════════════════

ALTER TABLE interests     ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts  ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notes    ENABLE ROW LEVEL SECURITY;

-- interests: everyone can read
CREATE POLICY "interests_public_read" ON interests
  FOR SELECT USING (true);

-- leads: public insert, authenticated read/update
CREATE POLICY "leads_public_insert" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "leads_admin_select" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "leads_admin_update" ON leads
  FOR UPDATE USING (auth.role() = 'authenticated');

-- lead_interests: public insert, authenticated read
CREATE POLICY "lead_interests_public_insert" ON lead_interests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "lead_interests_admin_select" ON lead_interests
  FOR SELECT USING (auth.role() = 'authenticated');

-- quiz_attempts: public insert+update (to link lead), authenticated read
CREATE POLICY "quiz_public_insert" ON quiz_attempts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "quiz_public_update_token" ON quiz_attempts
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "quiz_admin_select" ON quiz_attempts
  FOR SELECT USING (auth.role() = 'authenticated');

-- admin_notes: authenticated only
CREATE POLICY "notes_admin_all" ON admin_notes
  FOR ALL USING (auth.role() = 'authenticated');
