import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { deleteAffiliateLink, toggleAffiliateLink } from './actions';

export default async function AffiliateLinksPage() {
  const supabase = createAdminClient();
  const { data: links } = await supabase
    .from('affiliate_links')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Affiliate-Links</h1>
          <p className="text-sm text-gray-500 mt-1">{links?.length ?? 0} Links insgesamt</p>
        </div>
        <Link href="/admin/affiliate-links/new" className="btn-primary">
          + Neuer Link
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {!links || links.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            Noch keine Affiliate-Links.{' '}
            <Link href="/admin/affiliate-links/new" className="text-brand-600 hover:underline">
              Ersten Link erstellen
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Titel</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Redirect</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Kategorie</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {links.map((link) => (
                <tr key={link.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{link.title}</div>
                    {link.merchant && (
                      <div className="text-xs text-gray-400 mt-0.5">{link.merchant}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      /go/{link.slug}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{link.category || '–'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        link.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {link.is_active ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/affiliate-links/${link.id}/edit`}
                        className="text-xs text-brand-600 hover:underline"
                      >
                        Bearbeiten
                      </Link>
                      <form action={toggleAffiliateLink.bind(null, link.id, !link.is_active)}>
                        <button
                          type="submit"
                          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {link.is_active ? 'Deaktivieren' : 'Aktivieren'}
                        </button>
                      </form>
                      <form
                        action={deleteAffiliateLink.bind(null, link.id)}
                        onSubmit={(e) => {
                          if (!confirm(`"${link.title}" wirklich löschen?`)) e.preventDefault();
                        }}
                      >
                        <button
                          type="submit"
                          className="text-xs text-red-500 hover:text-red-700 transition-colors"
                        >
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
