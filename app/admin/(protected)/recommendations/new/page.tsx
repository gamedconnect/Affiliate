import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import RecommendationForm from '@/components/admin/RecommendationForm';
import { createRecommendation } from '../actions';

export default async function NewRecommendationPage() {
  const supabase = createAdminClient();
  const { data: links } = await supabase
    .from('affiliate_links')
    .select('id, title, slug')
    .eq('is_active', true)
    .order('title');

  return (
    <div>
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/admin/recommendations" className="hover:text-brand-600">Empfehlungen</Link>
        <span>/</span>
        <span className="text-gray-600">Neu</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neue Empfehlung</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <RecommendationForm
          action={createRecommendation}
          affiliateLinks={links ?? []}
          submitLabel="Empfehlung erstellen"
        />
      </div>
    </div>
  );
}
