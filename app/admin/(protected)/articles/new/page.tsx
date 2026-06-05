import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import ArticleEditor from '@/components/admin/ArticleEditor';
import { createArticle } from '../actions';

export default async function NewArticlePage() {
  const supabase = createAdminClient();

  const [{ data: links }, { data: recs }] = await Promise.all([
    supabase.from('affiliate_links').select('id, title, slug').eq('is_active', true).order('title'),
    supabase.from('product_recommendations').select('id, name, category').eq('is_active', true).order('name'),
  ]);

  return (
    <div>
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/admin/articles" className="hover:text-brand-600">Artikel</Link>
        <span>/</span>
        <span className="text-gray-600">Neu</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neuer Artikel</h1>

      <ArticleEditor
        action={createArticle}
        affiliateLinks={links ?? []}
        recommendations={recs ?? []}
        submitLabel="Artikel erstellen"
      />
    </div>
  );
}
