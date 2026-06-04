import type { Metadata } from 'next';
import { getLatestArticles } from '@/content/articles';
import { categories } from '@/content/categories';
import ArticleCard from '@/components/ArticleCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog & Ratgeber',
  description:
    'Alle Artikel rund um [Deine Nische]: Ratgeber, Vergleiche, Tipps und aktuelle News. Fundiert, praxisnah und aktuell.',
};

export default function BlogPage() {
  const articles = getLatestArticles(20);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Blog & Ratgeber</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Alle Artikel zu [Deine Nische] – praxisnah, aktuell und unabhängig.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="grid sm:grid-cols-2 gap-5">
            {articles.map((article, i) => (
              <>
                <ArticleCard key={article.slug} article={article} />
                {/* Ad after every 4 articles */}
                {(i + 1) % 4 === 0 && (
                  <div key={`ad-${i}`} className="sm:col-span-2">
                    <AdPlaceholder label="Werbeplatz zwischen Artikeln" />
                  </div>
                )}
              </>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="card p-8 text-center text-gray-400">
              <p>Noch keine Artikel vorhanden.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          {/* Kategorien */}
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              Kategorien
            </h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/kategorien/${cat.slug}`}
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-brand-600 transition-colors py-1"
                  >
                    <span>{cat.name}</span>
                    <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar Ad */}
          <div className="card p-4 border-dashed border-2 border-gray-200 bg-gray-50 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-1">Anzeige</p>
            <p className="text-gray-300 text-xs">Sidebar Werbeplatz<br />300 × 250 px</p>
          </div>

          {/* Transparenz-Hinweis */}
          <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Hinweis:</strong> Einige Links auf dieser Seite sind Affiliate-Links.{' '}
              <Link href="/transparenz" className="underline">Mehr erfahren</Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
