import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';

async function getStats() {
  const supabase = createAdminClient();

  const [
    { count: totalLinks },
    { count: activeLinks },
    { count: totalRecs },
    { count: activeRecs },
    { count: totalClicks },
    { count: totalArticles },
    { count: publishedArticles },
  ] = await Promise.all([
    supabase.from('affiliate_links').select('*', { count: 'exact', head: true }),
    supabase.from('affiliate_links').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('product_recommendations').select('*', { count: 'exact', head: true }),
    supabase.from('product_recommendations').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('affiliate_clicks').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('is_published', true),
  ]);

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { count: recentClicks } = await supabase
    .from('affiliate_clicks')
    .select('*', { count: 'exact', head: true })
    .gte('clicked_at', sevenDaysAgo);

  return {
    totalLinks: totalLinks ?? 0,
    activeLinks: activeLinks ?? 0,
    totalRecs: totalRecs ?? 0,
    activeRecs: activeRecs ?? 0,
    totalClicks: totalClicks ?? 0,
    recentClicks: recentClicks ?? 0,
    totalArticles: totalArticles ?? 0,
    publishedArticles: publishedArticles ?? 0,
  };
}

async function getRecentLinks() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('affiliate_links')
    .select('id, title, slug, is_active, created_at')
    .order('created_at', { ascending: false })
    .limit(5);
  return data ?? [];
}

export default async function DashboardPage() {
  const [stats, recentLinks] = await Promise.all([getStats(), getRecentLinks()]);

  const statCards = [
    { label: 'Artikel', value: stats.totalArticles, sub: `${stats.publishedArticles} veröffentlicht`, href: '/admin/articles' },
    { label: 'Affiliate-Links', value: stats.totalLinks, sub: `${stats.activeLinks} aktiv`, href: '/admin/affiliate-links' },
    { label: 'Empfehlungen', value: stats.totalRecs, sub: `${stats.activeRecs} aktiv`, href: '/admin/recommendations' },
    { label: 'Klicks gesamt', value: stats.totalClicks, sub: `${stats.recentClicks} letzte 7 Tage`, href: null },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Übersicht über dein Affiliate-System</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/articles/new" className="btn-primary">
            + Neuer Artikel
          </Link>
          <Link href="/admin/affiliate-links/new" className="btn-secondary">
            + Neuer Link
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">{card.label}</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
            <div className="text-xs text-gray-400">{card.sub}</div>
            {card.href && (
              <Link href={card.href} className="text-xs text-brand-600 hover:underline mt-2 inline-block">
                Verwalten →
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Recent Links */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900 text-sm">Zuletzt erstelle Affiliate-Links</h2>
          <Link href="/admin/affiliate-links" className="text-xs text-brand-600 hover:underline">
            Alle anzeigen →
          </Link>
        </div>
        {recentLinks.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">
            Noch keine Links.{' '}
            <Link href="/admin/affiliate-links/new" className="text-brand-600 hover:underline">
              Ersten Link erstellen
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {recentLinks.map((link) => (
              <li key={link.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <span className="text-sm font-medium text-gray-900">{link.title}</span>
                  <span className="ml-2 text-xs text-gray-400 font-mono">/go/{link.slug}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      link.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {link.is_active ? 'Aktiv' : 'Inaktiv'}
                  </span>
                  <Link
                    href={`/admin/affiliate-links/${link.id}/edit`}
                    className="text-xs text-brand-600 hover:underline"
                  >
                    Bearbeiten
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
