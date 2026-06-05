-- ============================================================
-- Blog-CMS: articles Tabelle
-- Diese Datei als Ergänzung zu schema.sql im SQL-Editor ausführen.
-- Die update_updated_at()-Funktion muss bereits aus schema.sql vorhanden sein.
-- ============================================================

CREATE TABLE IF NOT EXISTS articles (
  id                          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title                       TEXT        NOT NULL,
  slug                        TEXT        NOT NULL UNIQUE,
  excerpt                     TEXT,
  content                     TEXT        NOT NULL DEFAULT '',
  category                    TEXT,
  tags                        TEXT[]      DEFAULT '{}',
  featured_image_url          TEXT,
  meta_title                  TEXT,
  meta_description            TEXT,
  affiliate_link_ids          UUID[]      DEFAULT '{}',
  product_recommendation_ids  UUID[]      DEFAULT '{}',
  author                      TEXT,
  is_published                BOOLEAN     NOT NULL DEFAULT FALSE,
  published_at                TIMESTAMPTZ,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- auto-update updated_at
DROP TRIGGER IF EXISTS articles_updated_at ON articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public: only published articles visible
CREATE POLICY "public_read_published_articles"
  ON articles FOR SELECT
  USING (is_published = TRUE AND (published_at IS NULL OR published_at <= NOW()));

-- NOTE: Admin writes (INSERT/UPDATE/DELETE) use service role key → bypass RLS

-- ============================================================
-- KATEGORIEN (Startwerte für die Home-Gym-Nische)
-- Zur Info – diese werden als TEXT-Werte im Artikel-Formular genutzt,
-- keine separate Tabelle nötig.
-- Verfügbare Kategorien:
--   Home-Gym einrichten
--   Geräte
--   Training zuhause
--   Kaufberatung
--   Vergleiche
--   FAQ
-- ============================================================
