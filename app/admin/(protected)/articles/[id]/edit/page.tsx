import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import ArticleEditor from '@/components/admin/ArticleEditor';
import { updateArticle } from '../../actions';

interface Props {
  params: { id: string };
}

export default async function EditArticlePage({ params }: Props) {
  const supabase = createAdminClient();

  const [{ data: article }, { data: links }, { data: recs }] = await Promise.all([
    supabase.from('articles').select('*').eq('id', params.id).single(),
    supabase.from('affiliate_links').select('id, title, slug').eq('is_active', true).order('title'),
    supabase.from('product_recommendations').select('id, name, category').eq('is_active', true).order('name'),
  ]);

  if (!article) notFound();

  const action = updateArticle.bind(null, article.id);

  return (
    <div>
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/admin/articles" className="hover:text-brand-600">Artikel</Link>
        <span>/</span>
        <span className="text-gray-600">Bearbeiten</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Artikel bearbeiten</h1>
        <Link
          href={`/blog/${article.slug}`}
          target="_blank"
          className="text-xs text-gray-500 hover:text-brand-600 transition-colors"
        >
          ↗ Vorschau auf Website
        </Link>
      </div>

      <ArticleEditor
        action={action}
        initialData={article}
        affiliateLinks={links ?? []}
        recommendations={recs ?? []}
        submitLabel="Änderungen speichern"
      />
    </div>
  );
}
