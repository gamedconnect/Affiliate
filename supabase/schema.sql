-- ============================================================
-- Home-Gym Affiliate Site – Supabase Schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New Query)
-- ============================================================

-- ── PROFILES (Admin-Rolle) ───────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role       TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Automatically create a profile row on new user sign-up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── AFFILIATE_LINKS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS affiliate_links (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT        NOT NULL,
  slug          TEXT        NOT NULL UNIQUE,
  merchant      TEXT,
  category      TEXT,
  description   TEXT,
  target_url    TEXT,
  affiliate_url TEXT        NOT NULL,
  button_text   TEXT        NOT NULL DEFAULT 'Zum aktuellen Preis',
  is_active     BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── PRODUCT_RECOMMENDATIONS ──────────────────────────────────
CREATE TABLE IF NOT EXISTS product_recommendations (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT        NOT NULL,
  category         TEXT,
  short_description TEXT,
  pros             TEXT[]      DEFAULT '{}',
  cons             TEXT[]      DEFAULT '{}',
  price_hint       TEXT,
  image_url        TEXT,
  affiliate_link_id UUID       REFERENCES affiliate_links(id) ON DELETE SET NULL,
  position         INTEGER     NOT NULL DEFAULT 0,
  is_featured      BOOLEAN     NOT NULL DEFAULT FALSE,
  is_active        BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── AFFILIATE_CLICKS (kein IP-Speichern) ─────────────────────
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_link_id UUID       REFERENCES affiliate_links(id) ON DELETE CASCADE,
  clicked_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  page_slug        TEXT,
  referrer         TEXT
);

-- ── updated_at TRIGGER ───────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS affiliate_links_updated_at ON affiliate_links;
CREATE TRIGGER affiliate_links_updated_at
  BEFORE UPDATE ON affiliate_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS recommendations_updated_at ON product_recommendations;
CREATE TRIGGER recommendations_updated_at
  BEFORE UPDATE ON product_recommendations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
ALTER TABLE affiliate_links          ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_recommendations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks         ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles                 ENABLE ROW LEVEL SECURITY;

-- Public: read active affiliate links (for /go/[slug] redirect + frontend)
CREATE POLICY "public_read_active_links"
  ON affiliate_links FOR SELECT
  USING (is_active = TRUE);

-- Public: read active recommendations (for frontend components)
CREATE POLICY "public_read_active_recommendations"
  ON product_recommendations FOR SELECT
  USING (is_active = TRUE);

-- Public: insert clicks (tracking)
CREATE POLICY "public_insert_clicks"
  ON affiliate_clicks FOR INSERT
  WITH CHECK (TRUE);

-- Authenticated users: read own profile
CREATE POLICY "users_read_own_profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Authenticated users: insert own profile (in case trigger didn't fire)
CREATE POLICY "users_insert_own_profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- NOTE: Admin CRUD operations use the service role key (bypasses RLS)

-- ============================================================
-- HOW TO CREATE YOUR FIRST ADMIN USER
-- ============================================================
-- 1. Create user in Supabase Dashboard > Authentication > Users > Add user
--    (or via Auth API / Magic Link)
-- 2. Copy the user's UUID from the Users table
-- 3. Run in SQL Editor:
--
--    UPDATE profiles SET role = 'admin' WHERE id = '<your-user-uuid>';
--
-- 4. The user can now log in at /admin/login
-- ============================================================
