import Link from 'next/link';
import type { Metadata } from 'next';
import { getFeaturedArticles, getLatestArticles } from '@/content/articles';
import { categories } from '@/content/categories';
import ArticleCard from '@/components/ArticleCard';
import AdPlaceholder from '@/components/AdPlaceholder';

export const metadata: Metadata = {
  title: 'Ratgeber [Nische] – Dein zuverlässiger Guide',
  description:
    'Unabhängige Ratgeber, ehrliche Vergleiche und praktische Tipps rund um [Deine Nische]. Jetzt informieren!',
};

export default function HomePage() {
  const featured = getFeaturedArticles();
  const latest = getLatestArticles(4);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-medium px-3 py-1 rounded-full mb-5 backdrop-blur">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Täglich neue Inhalte
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
            Dein Ratgeber für<br />
            <span className="text-brand-200">[Deine Nische]</span>
          </h1>
          <p className="text-brand-100 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Praxisnahe Guides, ehrliche Vergleiche und fundierte Tipps – damit du in{' '}
            [Deine Nische] schneller vorankommst und die richtigen Entscheidungen triffst.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/blog"
              className="bg-white text-brand-700 hover:bg-brand-50 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Alle Artikel entdecken
            </Link>
            <Link
              href="/kategorien/ratgeber"
              className="border border-white/40 text-white hover:bg-white/10 font-medium px-6 py-3 rounded-xl transition-colors"
            >
              Ratgeber lesen →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TOP-WERBEPLATZ ────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
        <AdPlaceholder label="Top-Werbeplatz (z. B. 728 × 90 Leaderboard)" />
      </div>

      {/* ── TRUST-BAR ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '📚', label: 'Geprüfte Inhalte', sub: 'Recherchiert & aktuell' },
            { icon: '🔍', label: 'Unabhängig', sub: 'Keine versteckten Interessen' },
            { icon: '⚡', label: 'Praxisnah', sub: 'Direkt umsetzbar' },
            { icon: '🛡️', label: 'Transparent', sub: 'Affiliate-Hinweise sichtbar' },
          ].map((item) => (
            <div key={item.label} className="card p-4 text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="font-semibold text-sm text-gray-900">{item.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── KATEGORIEN ────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Themenbereiche</h2>
          <Link href="/kategorien" className="text-sm text-brand-600 hover:underline">
            Alle Kategorien →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategorien/${cat.slug}`}
              className="card p-5 group hover:border-brand-200"
            >
              <div className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
                {cat.name}
              </div>
              <div className="text-xs text-gray-500 line-clamp-2">{cat.description}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED ARTICLES ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Empfohlene Artikel</h2>
          <Link href="/blog" className="text-sm text-brand-600 hover:underline">
            Alle Artikel →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} featured />
          ))}
        </div>
      </section>

      {/* ── LATEST ARTICLES ───────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Neueste Beiträge</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* ── MID-WERBEPLATZ ────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        <AdPlaceholder label="Mid-Page Werbeplatz (z. B. 300 × 250 Rectangle)" />
      </div>

      {/* ── NEWSLETTER / CTA ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 mb-4">
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Bleib auf dem Laufenden
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Verpasse keine neuen Ratgeber und Tipps zu [Deine Nische]. Einmal pro Woche – kein Spam.
          </p>
          {/* Newsletter-Formular Platzhalter – hier eigenen Provider einbinden */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="deine@email.de"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <button className="btn-primary whitespace-nowrap">
              Anmelden
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Kein Spam. Jederzeit abmeldbar. Weitere Infos in unserer{' '}
            <a href="/datenschutz" className="underline">Datenschutzerklärung</a>.
          </p>
        </div>
      </section>
    </>
  );
}
