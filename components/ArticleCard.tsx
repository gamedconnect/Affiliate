import Link from 'next/link';
import type { Article } from '@/content/types';
import { formatDate } from '@/lib/utils';
import CategoryBadge from './CategoryBadge';

interface Props {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: Props) {
  if (featured) {
    return (
      <Link href={`/blog/${article.slug}`} className="card block p-6 group">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <CategoryBadge category={article.category} slug={article.categorySlug} />
              <span className="text-xs text-gray-400">{article.readTime} Min. Lesezeit</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
              {article.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <time className="text-xs text-gray-400">{formatDate(article.date)}</time>
              <span className="text-brand-600 text-sm font-medium group-hover:underline">Weiterlesen →</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${article.slug}`} className="card block p-5 group">
      <div className="flex items-center gap-2 mb-2">
        <CategoryBadge category={article.category} slug={article.categorySlug} />
        <span className="text-xs text-gray-400">{article.readTime} Min.</span>
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
        {article.title}
      </h3>
      <p className="text-gray-500 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
      <time className="text-xs text-gray-400">{formatDate(article.date)}</time>
    </Link>
  );
}
