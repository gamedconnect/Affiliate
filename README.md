# Home-Gym Affiliate Site

Next.js 14 Affiliate-Website mit Blog-CMS, Redirect-Tracking und Admin-Backend – betrieben auf Vercel + Supabase.

---

## Tech-Stack

| Layer | Technologie |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Datenbank + Auth | Supabase (Postgres + Auth) |
| Markdown | `marked` |
| Deployment | Vercel |

---

## Projektstruktur

```
app/
├── (public)/           # Öffentliche Seiten (Header/Footer via Layout)
│   ├── blog/           # /blog – Artikelliste
│   └── blog/[slug]/    # /blog/[slug] – Einzelartikel
├── admin/
│   ├── login/          # /admin/login
│   └── (protected)/    # Alle geschützten Admin-Seiten
│       ├── dashboard/
│       ├── articles/         # CMS – Artikel
│       ├── affiliate-links/  # Affiliate-Links verwalten
│       └── recommendations/  # Produktempfehlungen
├── go/[slug]/          # Redirect-Handler mit Klick-Tracking
components/
├── admin/              # Admin-UI-Komponenten (ArticleEditor, AdminNav, …)
lib/
├── supabase/
│   ├── client.ts       # Browser-Client (anon key)
│   ├── server.ts       # Server-Client (cookies)
│   └── admin.ts        # Admin-Client (service_role – NUR server-seitig!)
│   └── types.ts        # TypeScript-Interfaces
└── markdown.ts         # renderMarkdown(), estimateReadTime()
supabase/
├── schema.sql          # Haupt-Schema (profiles, affiliate_links, …)
└── articles_schema.sql # Artikel-Tabelle
middleware.ts           # Schützt /admin/* per Session-Check
```

---

## Setup

### 1. Repository klonen & Abhängigkeiten installieren

```bash
git clone <repo-url>
cd Affiliate
npm install
```

### 2. Supabase-Projekt anlegen

1. Gehe zu [supabase.com](https://supabase.com) und erstelle ein neues Projekt.
2. Öffne **Project Settings → API** und kopiere:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` / `public` Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` Key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Datenbank-Schema einrichten

Führe die SQL-Dateien **nacheinander** im **Supabase SQL Editor** aus:

```
supabase/schema.sql          ← zuerst
supabase/articles_schema.sql ← danach
```

### 4. Umgebungsvariablen setzen

```bash
cp .env.example .env.local
```

Öffne `.env.local` und fülle die Werte aus:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=https://DEIN-PROJEKT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # NUR server-seitig, niemals im Browser!
```

### 5. Entwicklungsserver starten

```bash
npm run dev
# → http://localhost:3000
```

---

## Admin-Account erstellen

Der Admin-Login läuft über Supabase Auth. Du musst einen Benutzer anlegen und ihm manuell die `admin`-Rolle vergeben.

### Schritt 1 – Benutzer in Supabase anlegen

Gehe zu **Supabase Dashboard → Authentication → Users → Add user** und trage E-Mail + Passwort ein.

> Alternativ per SQL:
> ```sql
> -- Wird normalerweise über das Supabase-Dashboard gemacht.
> -- "Confirm email" im Dashboard aktivieren, damit kein Bestätigungs-Mail nötig ist.
> ```

### Schritt 2 – Admin-Rolle vergeben

Öffne den **Supabase SQL Editor** und führe aus:

```sql
UPDATE profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'deine@email.de'
);
```

> Die `profiles`-Zeile wird automatisch beim ersten Login angelegt (via Trigger). Falls der Benutzer sich noch nie eingeloggt hat, erst einloggen, dann die SQL ausführen.

### Schritt 3 – Einloggen

Öffne `http://localhost:3000/admin/login` (oder auf Vercel `/admin/login`) und melde dich mit den Zugangsdaten aus Schritt 1 an.

---

## Funktionen

### Öffentliche Website
| Route | Beschreibung |
|---|---|
| `/` | Startseite mit Featured-Artikeln + Empfehlungsboxen |
| `/blog` | Artikelliste – lädt aus DB, fällt auf statische Artikel zurück |
| `/blog/[slug]` | Einzelartikel – DB (Markdown) oder statisch |
| `/go/[slug]` | Affiliate-Redirect mit Klick-Tracking (302, fire-and-forget) |
| `/kategorien/[slug]` | Artikel nach Kategorie gefiltert |

### Admin-Backend (`/admin`)
| Route | Beschreibung |
|---|---|
| `/admin/dashboard` | Statistiken: Artikel, Links, Klicks |
| `/admin/articles` | Artikelliste mit Suche, Kategorie- + Statusfilter |
| `/admin/articles/new` | Neuen Artikel erstellen (Markdown-Editor + Vorschau) |
| `/admin/articles/[id]/edit` | Artikel bearbeiten, veröffentlichen, als Entwurf speichern |
| `/admin/affiliate-links` | Alle Affiliate-Links verwalten |
| `/admin/affiliate-links/new` | Neuen Link anlegen (Slug → `/go/slug`) |
| `/admin/recommendations` | Produktempfehlungen verwalten |

---

## Deployment auf Vercel

1. Repository mit Vercel verbinden.
2. Unter **Project Settings → Environment Variables** alle drei Supabase-Variablen eintragen.
3. Deployen – alle Admin-Seiten werden automatisch als `Dynamic` (server-rendered) gebaut.

> Die `SUPABASE_SERVICE_ROLE_KEY`-Variable darf **niemals** mit `NEXT_PUBLIC_`-Prefix versehen werden.

---

## Sicherheitsarchitektur

- **Middleware** (`middleware.ts`) prüft Session + Admin-Rolle bei jedem Request auf `/admin/*`
- **Admin-Layout** prüft server-seitig nochmals `profiles.role = 'admin'`
- **Server Actions** rufen `assertAdmin()` vor jeder DB-Mutation auf
- **Service-Role-Key** wird ausschließlich server-seitig verwendet
- **Klick-Tracking** speichert keine IP-Adressen
- Entwürfe (`is_published = false`) sind öffentlich nie abrufbar (RLS-Policy)
