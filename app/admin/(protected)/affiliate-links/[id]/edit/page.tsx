import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import AffiliateLinkForm from '@/components/admin/AffiliateLinkForm';
import { updateAffiliateLink } from '../../actions';

interface Props {
  params: { id: string };
}

export default async function EditAffiliateLinkPage({ params }: Props) {
  const supabase = createAdminClient();
  const { data: link } = await supabase
    .from('affiliate_links')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!link) notFound();

  const action = updateAffiliateLink.bind(null, link.id);

  return (
    <div>
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/admin/affiliate-links" className="hover:text-brand-600">Affiliate-Links</Link>
        <span>/</span>
        <span className="text-gray-600">Bearbeiten</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Link bearbeiten</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <AffiliateLinkForm
          action={action}
          initialData={link}
          submitLabel="Änderungen speichern"
        />
      </div>
    </div>
  );
}
