import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { formatDate } from '@/lib/utils';
import { deleteArticle, publishArticle, unpublishArticle } from './actions';

const CATEGORIES = [
  'Home-Gym einrichten',
  'Geräte',
  'Training zuhause',
  'Kaufberatung',
  'Vergleiche',
  'FAQ',
];

interface SearchParams {
  q?: string;
  category?: string;
  status?: 'published' | 'draft' | 'all';
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const supabase = createAdminClient();
  const q = searchParams.q?.trim() || '';
  const category = searchParams.category || '';
  const status = searchParams.status || 'all';

  let query = supabase
    .from('articles')
    .select('id, title, slug, category, is_published, published_at, created_at, tags')
    .order('created_at', { ascending: false });

  if (q) query = query.ilike('title', `%${q}%`);
  if (category) query = query.eq('category', category);
  if (status === 'published') query = query.eq('is_published', true);
  if (status === 'draft') query = query.eq('is_published', false);

  const { data: articles } = await query;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Artikel</h1>
          <p className="text-sm text-gray-500 mt-1">{articles?.length ?? 0} Artikel</p>
        </div>
        <Link href="/admin/articles/new" className="btn-primary">
          + Neuer Artikel
        </Link>
      </div>

      {/* Filter Bar */}
      <form method="GET" className="flex flex-wrap gap-3 mb-6 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Titel suchen…"
          className="flex-1 min-w-40 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
        <select
          name="category"
          defaultValue={category}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          <option value="">Alle Kategorien</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={status}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          <option value="all">Alle Status</option>
          <option value="published">Veröffentlicht</option>
          <option value="draft">Entwurf</option>
        </select>
        <button type="submit" className="btn-primary">
          Filtern
        </button>
        {(q || category || status !== 'all') && (
          <Link href="/admin/articles" className="btn-secondary">
            Zurücksetzen
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {!articles || articles.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            {q || category || status !== 'all' ? (
              'Keine Artikel gefunden.'
            ) : (
              <>
                Noch keine Artikel.{' '}
                <Link href="/admin/articles/new" className="text-brand-600 hover:underline">
                  Ersten Artikel erstellen
                </Link>
              </>
            )}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Titel</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Kategorie</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Datum</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{article.title}</div>
                    <code className="text-xs text-gray-400">/blog/{article.slug}</code>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{article.category || '–'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        article.is_published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {article.is_published ? 'Veröffentlicht' : 'Entwurf'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {article.published_at
                      ? formatDate(article.published_at)
                      : formatDate(article.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/blog/${article.slug}`}
                        target="_blank"
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                        title="Vorschau"
                      >
                        ↗
                      </Link>
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="text-xs text-brand-600 hover:underline"
                      >
                        Bearbeiten
                      </Link>
                      {article.is_published ? (
                        <form action={unpublishArticle.bind(null, article.id)}>
                          <button type="submit" className="text-xs text-amber-600 hover:text-amber-800 transition-colors">
                            Zurückziehen
                          </button>
                        </form>
                      ) : (
                        <form action={publishArticle.bind(null, article.id)}>
                          <button type="submit" className="text-xs text-green-600 hover:text-green-800 transition-colors">
                            Veröffentlichen
                          </button>
                        </form>
                      )}
                      <form action={deleteArticle.bind(null, article.id)}>
                        <button type="submit" className="text-xs text-red-500 hover:text-red-700 transition-colors">
                          Löschen
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
