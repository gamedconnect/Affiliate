import AffiliateButton from './AffiliateButton';
import type { ProductRecommendation, AffiliateLink } from '@/lib/supabase/types';

type RecWithLink = ProductRecommendation & { affiliate_links?: AffiliateLink | null };

interface Props {
  rec: RecWithLink;
  fromPage?: string;
  highlight?: boolean;
}

export default function DbRecommendationBox({ rec, fromPage, highlight }: Props) {
  const link = rec.affiliate_links;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-5 transition-shadow hover:shadow-md ${
        highlight || rec.is_featured
          ? 'border-brand-300 bg-brand-50 shadow-sm'
          : 'border-gray-200 bg-white'
      }`}
    >
      {(highlight || rec.is_featured) && (
        <span className="absolute -top-3 left-4 bg-brand-600 text-white text-[11px] font-semibold px-3 py-0.5 rounded-full">
          Empfohlen
        </span>
      )}

      {rec.category && (
        <span className="inline-block bg-brand-100 text-brand-700 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full mb-3 w-fit">
          {rec.category}
        </span>
      )}

      <h3 className="text-base font-bold text-gray-900 mb-1">{rec.name}</h3>

      {rec.short_description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-3 flex-1">
          {rec.short_description}
        </p>
      )}

      {rec.pros && rec.pros.length > 0 && (
        <ul className="mb-3 space-y-1">
          {rec.pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
              <span className="text-green-500 mt-0.5 flex-shrink-0">✔</span>
              {pro}
            </li>
          ))}
        </ul>
      )}

      {rec.price_hint && (
        <p className="text-xs text-gray-400 mb-3">{rec.price_hint}</p>
      )}

      {link ? (
        <AffiliateButton
          slug={link.slug}
          label={link.button_text}
          fromPage={fromPage}
          className="mt-auto text-sm text-center justify-center"
        />
      ) : (
        <span className="mt-auto text-xs text-gray-400 italic">Kein Link verfügbar</span>
      )}

      <p className="mt-2 text-[10px] text-gray-400 text-center">
        * Affiliate-Link – keine Mehrkosten für dich
      </p>
    </div>
  );
}
