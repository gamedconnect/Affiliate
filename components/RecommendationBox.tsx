import type { ProductRecommendation } from '@/content/types';

interface Props {
  rec: ProductRecommendation;
}

export default function RecommendationBox({ rec }: Props) {
  const href = rec.href ?? '#affiliate-link';
  const linkText = rec.linkText ?? 'Jetzt ansehen →';

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-5 transition-shadow hover:shadow-md ${
        rec.highlight
          ? 'border-brand-300 bg-brand-50 shadow-sm'
          : 'border-gray-200 bg-white'
      }`}
    >
      {rec.highlight && (
        <span className="absolute -top-3 left-4 bg-brand-600 text-white text-[11px] font-semibold px-3 py-0.5 rounded-full">
          Empfohlen
        </span>
      )}

      <span className="inline-block bg-brand-100 text-brand-700 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full mb-3 w-fit">
        {rec.badge}
      </span>

      <h3 className="text-base font-bold text-gray-900 mb-1">{rec.productType}</h3>

      <p className="text-sm text-gray-600 leading-relaxed mb-3 flex-1">{rec.benefit}</p>

      <div className="flex items-start gap-1.5 mb-4">
        <span className="text-brand-500 mt-0.5 flex-shrink-0 text-xs">✔</span>
        <span className="text-xs text-gray-500">{rec.targetAudience}</span>
      </div>

      <a
        href={href}
        rel="noopener noreferrer nofollow"
        className="btn-primary text-sm text-center"
      >
        {linkText}
      </a>

      <p className="mt-2 text-[10px] text-gray-400 text-center">
        * Affiliate-Link – keine Mehrkosten für dich
      </p>
    </div>
  );
}
