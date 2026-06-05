import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articles, getArticleBySlug } from '@/content/articles';
import { formatDate, slugify } from '@/lib/utils';
import { renderMarkdown, estimateReadTime } from '@/lib/markdown';
import { createClient } from '@/lib/supabase/server';
import CategoryBadge from '@/components/CategoryBadge';
import AffiliateCTA from '@/components/AffiliateCTA';
import AdPlaceholder from '@/components/AdPlaceholder';
import RecommendationBox from '@/components/RecommendationBox';

// Static articles are pre-rendered; DB articles are dynamic
export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

interface Props {
  params: { slug: string };
}

// ── DB Article type ────────────────────────────────────────────────────────
type DbArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  tags: string[] | null;
  featured_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  author: string | null;
  published_at: string | null;
  created_at: string;
  is_published: boolean;
};

async function getDbArticle(slug: string): Promise<DbArticle | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

// ── Metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dbArticle = await getDbArticle(params.slug);
  if (dbArticle) {
    const title = dbArticle.meta_title || dbArticle.title;
    const description = dbArticle.meta_description || dbArticle.excerpt || '';
    return {
      title,
      description,
      openGraph: { title, description, type: 'article', publishedTime: dbArticle.published_at ?? undefined },
    };
  }
  const staticArticle = getArticleBySlug(params.slug);
  if (!staticArticle) return {};
  return {
    title: staticArticle.metaTitle,
    description: staticArticle.metaDescription,
    openGraph: {
      title: staticArticle.metaTitle,
      description: staticArticle.metaDescription,
      type: 'article',
      publishedTime: staticArticle.date,
    },
  };
}

// ── Static article content renderer (unchanged) ───────────────────────────
function renderContent(text: string) {
  return text.split('\n\n').map((para, i) => {
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    const content = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return (
      <p key={i} className="mb-5 text-gray-700 leading-relaxed text-[1.05rem]">
        {content}
      </p>
    );
  });
}

// ── Shared layout wrappers ────────────────────────────────────────────────
function AffiliateDisclosure() {
  return (
    <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 mb-8">
      <span className="text-amber-500 mt-0.5 flex-shrink-0">ℹ️</span>
      <p className="text-xs text-amber-700 leading-relaxed">
        <strong>Transparenzhinweis:</strong> Dieser Artikel enthält ggf. Affiliate-Links.
        Bei einem Kauf über diese Links erhalten wir eine Provision – für dich ohne Mehrkosten.{' '}
        <Link href="/transparenz" className="underline">Mehr erfahren</Link>
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default async function ArticlePage({ params }: Props) {
  const dbArticle = await getDbArticle(params.slug);

  // ── DB Article ──────────────────────────────────────────────────────────
  if (dbArticle) {
    const cat = dbArticle.category || 'Ratgeber';
    const catSlug = slugify(cat);
    const readMin = estimateReadTime(dbArticle.content);
    const date = dbArticle.published_at || dbArticle.created_at;
    const htmlContent = renderMarkdown(dbArticle.content);

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
              <Link href="/" className="hover:text-brand-600">Startseite</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-brand-600">Blog</Link>
              <span>/</span>
              <span className="text-gray-600">{cat}</span>
            </nav>

            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <CategoryBadge category={cat} slug={catSlug} clickable />
                <span className="text-xs text-gray-400">{readMin} Min. Lesezeit</span>
                <time className="text-xs text-gray-400">{formatDate(date)}</time>
                {dbArticle.author && (
                  <span className="text-xs text-gray-400">von {dbArticle.author}</span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {dbArticle.title}
              </h1>
              {dbArticle.excerpt && (
                <p className="text-lg text-gray-500 leading-relaxed border-l-4 border-brand-200 pl-4">
                  {dbArticle.excerpt}
                </p>
              )}
            </header>

            {/* Featured Image */}
            {dbArticle.featured_image_url && (
              <img
                src={dbArticle.featured_image_url}
                alt={dbArticle.title}
                className="w-full rounded-2xl mb-8 object-cover max-h-80"
              />
            )}

            <AffiliateDisclosure />

            {/* Markdown Content */}
            <div
              className="markdown-content mb-10"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Tags */}
            {dbArticle.tags && dbArticle.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                <span className="text-xs text-gray-400 mr-1 self-center">Tags:</span>
                {dbArticle.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <AdPlaceholder label="Werbeplatz nach Artikel" className="mt-8" />
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-5">
            <div className="sticky top-24 space-y-5">
              <div className="card p-4 border-dashed border-2 border-gray-200 bg-gray-50 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-1">Anzeige</p>
                <p className="text-gray-300 text-xs">Sidebar Ad<br />300 × 250 px</p>
                <div className="mt-2 h-[250px] bg-gray-100 rounded-lg" />
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
                <p className="text-xs text-amber-700 leading-relaxed">
                  Einige Links sind Affiliate-Links.{' '}
                  <Link href="/transparenz" className="underline">Mehr erfahren</Link>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // ── Static Article (fallback, existing rendering unchanged) ────────────
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug && a.categorySlug === article.categorySlug)
    .slice(0, 3);
  const otherArticles = articles
    .filter((a) => a.slug !== article.slug && a.categorySlug !== article.categorySlug)
    .slice(0, 2);
  const suggested = [...relatedArticles, ...otherArticles].slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <article className="flex-1 min-w-0">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
            <Link href="/" className="hover:text-brand-600">Startseite</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand-600">Blog</Link>
            <span>/</span>
            <Link href={`/kategorien/${article.categorySlug}`} className="hover:text-brand-600">
              {article.category}
            </Link>
          </nav>

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CategoryBadge category={article.category} slug={article.categorySlug} clickable />
              <span className="text-xs text-gray-400">{article.readTime} Min. Lesezeit</span>
              <time className="text-xs text-gray-400">{formatDate(article.date)}</time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed border-l-4 border-brand-200 pl-4">
              {article.excerpt}
            </p>
          </header>

          <AffiliateDisclosure />

          <div className="prose-article mb-8">{renderContent(article.intro)}</div>

          {article.sections.length > 1 && (
            <nav className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Inhaltsverzeichnis
              </h2>
              <ol className="space-y-1.5">
                {article.sections.map((section, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`} className="text-sm text-brand-600 hover:underline flex items-start gap-2">
                      <span className="flex-shrink-0 text-gray-400 text-xs mt-0.5">{i + 1}.</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#fazit" className="text-sm text-brand-600 hover:underline flex items-start gap-2">
                    <span className="flex-shrink-0 text-gray-400 text-xs mt-0.5">{article.sections.length + 1}.</span>
                    Fazit
                  </a>
                </li>
              </ol>
            </nav>
          )}

          {article.sections.map((section, i) => (
            <section key={i} id={`section-${i}`} className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 border-b border-gray-100 pb-2">
                {section.heading}
              </h2>
              <div className="prose-article">{renderContent(section.content)}</div>

              {section.tips && section.tips.length > 0 && (
                <div className="my-6 bg-green-50 border border-green-200 rounded-xl p-5">
                  <h3 className="font-semibold text-green-800 text-sm mb-3 flex items-center gap-2">
                    <span>✅</span> Praktische Tipps
                  </h3>
                  <ul className="space-y-2">
                    {section.tips.map((tip, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-green-900">
                        <span className="flex-shrink-0 mt-0.5 text-green-500">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.adPlaceholder && <AdPlaceholder />}
              {section.affiliate && <AffiliateCTA box={section.affiliate} />}

              {section.recommendations && section.recommendations.length > 0 && (
                <div className="my-8">
                  <h3 className="text-base font-semibold text-gray-700 mb-4">Passende Empfehlungen</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {section.recommendations.map((rec) => (
                      <RecommendationBox key={rec.badge} rec={rec} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}

          <section id="fazit" className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 border-b border-gray-100 pb-2">Fazit</h2>
            <div className="prose-article">{renderContent(article.conclusion)}</div>
          </section>

          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
              <span className="text-xs text-gray-400 mr-1 self-center">Tags:</span>
              {article.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          )}

          <AdPlaceholder label="Werbeplatz nach Artikel" className="mt-8" />

          {suggested.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Das könnte dich auch interessieren</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {suggested.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="card p-4 group block">
                    <CategoryBadge category={a.category} slug={a.categorySlug} />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors leading-snug">
                      {a.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-5">
          <div className="sticky top-24 space-y-5">
            <div className="card p-4 border-dashed border-2 border-gray-200 bg-gray-50 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-1">Anzeige</p>
              <p className="text-gray-300 text-xs">Sidebar Ad<br />300 × 250 px</p>
              <div className="mt-2 h-[250px] bg-gray-100 rounded-lg" />
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-4">Weitere Artikel</h3>
              <ul className="space-y-3">
                {articles
                  .filter((a) => a.slug !== article.slug)
                  .slice(0, 4)
                  .map((a) => (
                    <li key={a.slug}>
                      <Link href={`/blog/${a.slug}`} className="text-xs text-gray-600 hover:text-brand-600 transition-colors leading-snug block">
                        {a.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
              <p className="text-xs text-amber-700 leading-relaxed">
                Einige Links sind Affiliate-Links.{' '}
                <Link href="/transparenz" className="underline">Mehr erfahren</Link>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
