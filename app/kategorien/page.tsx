import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/content/categories';
import { getArticlesByCategory } from '@/content/articles';

export const metadata: Metadata = {
  title: 'Alle Kategorien',
  description: 'Entdecke alle Themenbereiche unseres Ratgebers zu [Deine Nische].',
};

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200' },
  green:  { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
};

export default function CategoriesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Alle Kategorien</h1>
      <p className="text-gray-500 mb-10">
        Finde Artikel nach Themenbereich – von Einsteiger-Guides bis zu Profi-Vergleichen.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const count = getArticlesByCategory(cat.slug).length;
          const colors = colorClasses[cat.color] ?? colorClasses.blue;
          return (
            <Link
              key={cat.slug}
              href={`/kategorien/${cat.slug}`}
              className={`rounded-xl border p-6 group transition-all hover:shadow-md ${colors.bg} ${colors.border}`}
            >
              <div className={`font-semibold text-xl mb-2 ${colors.text}`}>{cat.name}</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{cat.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{count} Artikel</span>
                <span className={`text-sm font-medium group-hover:underline ${colors.text}`}>
                  Alle anzeigen →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
