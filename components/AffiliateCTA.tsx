import type { AffiliateBox } from '@/content/types';

interface Props {
  box: AffiliateBox;
}

export default function AffiliateCTA({ box }: Props) {
  return (
    <aside className="my-8 bg-brand-50 border border-brand-200 rounded-xl p-6">
      <h4 className="font-semibold text-brand-900 text-base mb-2">{box.title}</h4>
      <p className="text-brand-800 text-sm leading-relaxed mb-4">{box.description}</p>
      <a
        href={box.href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="btn-primary inline-flex"
      >
        {box.linkText}
      </a>
      {box.disclaimer && (
        <p className="mt-3 text-xs text-brand-600 opacity-75">{box.disclaimer}</p>
      )}
    </aside>
  );
}
