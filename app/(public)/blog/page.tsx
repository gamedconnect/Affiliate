import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/content/categories';
import { getLatestArticles } from '@/content/articles';
import ArticleCard from '@/components/ArticleCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { createClient } from '@/lib/supabase/server';
import { slugify, formatDate } from '@/lib/utils';
import type { Article } from '@/content/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog & Ratgeber',
  description:
    'Alle Artikel rund um das Home-Gym: Ratgeber, Vergleiche, Tipps und Kaufberatung. Fundiert, praxisnah und aktuell.',
};

function dbArticleToCard(a: {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
}): Article {
  const cat = a.category || 'Ratgeber';
  return {
    slug: a.slug,
    title: a.title,
    metaTitle: a.title,
    metaDescription: a.excerpt || '',
    category: cat,
    categorySlug: slugify(cat),
    date: a.published_at || a.created_at,
    readTime: 5,
    featured: false,
    excerpt: a.excerpt || '',
    intro: '',
    sections: [],
    conclusion: '',
    tags: [],
  };
}

export default async function BlogPage() {
  // Try DB articles first
  let dbArticles: Article[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('articles')
      .select('slug, title, excerpt, category, published_at, created_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(20);
    if (data && data.length > 0) {
      dbArticles = data.map(dbArticleToCard);
    }
  } catch {
    // DB not available – fall back to static
  }

  // Static fallback
  const staticArticles = getLatestArticles(20);

  // Show DB articles if available, otherwise static
  const articles = dbArticles.length > 0 ? dbArticles : staticArticles;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Blog & Ratgeber</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Ratgeber, Vergleiche und Tipps rund ums Home-Gym – praxisnah, aktuell und unabhängig.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main */}
        <div className="flex-1 min-w-0">
          {articles.length === 0 ? (
            <div className="card p-8 text-center text-gray-400">
              <p>Noch keine Artikel vorhanden.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {articles.map((article, i) => (
                <>
                  <ArticleCard key={article.slug} article={article} />
                  {(i + 1) % 4 === 0 && (
                    <div key={`ad-${i}`} className="sm:col-span-2">
                      <AdPlaceholder label="Werbeplatz zwischen Artikeln" />
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
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

          <div className="card p-4 border-dashed border-2 border-gray-200 bg-gray-50 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-1">Anzeige</p>
            <p className="text-gray-300 text-xs">Sidebar Werbeplatz<br />300 × 250 px</p>
          </div>

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
