import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { deleteRecommendation, toggleRecommendation } from './actions';

export default async function RecommendationsPage() {
  const supabase = createAdminClient();
  const { data: recs } = await supabase
    .from('product_recommendations')
    .select('*, affiliate_links(title, slug)')
    .order('position', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produkt-Empfehlungen</h1>
          <p className="text-sm text-gray-500 mt-1">{recs?.length ?? 0} Empfehlungen insgesamt</p>
        </div>
        <Link href="/admin/recommendations/new" className="btn-primary">
          + Neue Empfehlung
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {!recs || recs.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            Noch keine Empfehlungen.{' '}
            <Link href="/admin/recommendations/new" className="text-brand-600 hover:underline">
              Erste Empfehlung erstellen
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Name</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Kategorie</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Affiliate-Link</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Pos.</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recs.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      {rec.name}
                      {rec.is_featured && (
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    {rec.short_description && (
                      <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{rec.short_description}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{rec.category || '–'}</td>
                  <td className="px-4 py-3 text-xs">
                    {rec.affiliate_links ? (
                      <code className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        /go/{(rec.affiliate_links as { slug: string }).slug}
                      </code>
                    ) : (
                      <span className="text-gray-400">–</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs text-center">{rec.position}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        rec.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {rec.is_active ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/recommendations/${rec.id}/edit`}
                        className="text-xs text-brand-600 hover:underline"
                      >
                        Bearbeiten
                      </Link>
                      <form action={toggleRecommendation.bind(null, rec.id, !rec.is_active)}>
                        <button type="submit" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                          {rec.is_active ? 'Deaktivieren' : 'Aktivieren'}
                        </button>
                      </form>
                      <form action={deleteRecommendation.bind(null, rec.id)}>
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
