import Link from 'next/link';
import AffiliateLinkForm from '@/components/admin/AffiliateLinkForm';
import { createAffiliateLink } from '../actions';

export default function NewAffiliateLinkPage() {
  return (
    <div>
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/admin/affiliate-links" className="hover:text-brand-600">Affiliate-Links</Link>
        <span>/</span>
        <span className="text-gray-600">Neu</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neuer Affiliate-Link</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <AffiliateLinkForm action={createAffiliateLink} submitLabel="Link erstellen" />
      </div>
    </div>
  );
}
