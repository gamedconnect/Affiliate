import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import RecommendationForm from '@/components/admin/RecommendationForm';
import { updateRecommendation } from '../../actions';

interface Props {
  params: { id: string };
}

export default async function EditRecommendationPage({ params }: Props) {
  const supabase = createAdminClient();

  const [{ data: rec }, { data: links }] = await Promise.all([
    supabase.from('product_recommendations').select('*').eq('id', params.id).single(),
    supabase.from('affiliate_links').select('id, title, slug').eq('is_active', true).order('title'),
  ]);

  if (!rec) notFound();

  const action = updateRecommendation.bind(null, rec.id);

  return (
    <div>
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/admin/recommendations" className="hover:text-brand-600">Empfehlungen</Link>
        <span>/</span>
        <span className="text-gray-600">Bearbeiten</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Empfehlung bearbeiten</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <RecommendationForm
          action={action}
          initialData={rec}
          affiliateLinks={links ?? []}
          submitLabel="Änderungen speichern"
        />
      </div>
    </div>
  );
}
