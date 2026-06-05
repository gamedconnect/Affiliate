import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getCategoryBySlug } from '@/content/categories';
import { getArticlesByCategory } from '@/content/articles';
import ArticleCard from '@/components/ArticleCard';
import AdPlaceholder from '@/components/AdPlaceholder';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return {};
  return {
    title: `${cat.name} – Alle Artikel`,
    description: cat.description,
  };
}

export default function CategoryPage({ params }: Props) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();

  const catArticles = getArticlesByCategory(params.slug);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-brand-600">Startseite</Link>
        <span>/</span>
        <Link href="/kategorien" className="hover:text-brand-600">Kategorien</Link>
        <span>/</span>
        <span className="text-gray-600">{cat.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">{cat.name}</h1>
      <p className="text-gray-500 mb-8 max-w-2xl">{cat.description}</p>

      <AdPlaceholder label="Kategorie-Werbeplatz" />

      {catArticles.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-5 mt-6">
          {catArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} featured />
          ))}
        </div>
      ) : (
        <div className="card p-10 text-center text-gray-400">
          <p>Noch keine Artikel in dieser Kategorie.</p>
          <Link href="/blog" className="btn-primary mt-4 inline-flex">
            Alle Artikel ansehen
          </Link>
        </div>
      )}

      {/* Other categories */}
      <div className="mt-14">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Weitere Kategorien</h2>
        <div className="flex flex-wrap gap-3">
          {categories
            .filter((c) => c.slug !== params.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/kategorien/${c.slug}`}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:border-brand-300 hover:text-brand-600 transition-colors"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
