interface Props {
  slug: string;
  label?: string;
  fromPage?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function AffiliateButton({
  slug,
  label = 'Zum aktuellen Preis',
  fromPage,
  className = '',
  variant = 'primary',
}: Props) {
  const href = fromPage ? `/go/${slug}?from=${fromPage}` : `/go/${slug}`;
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <a
      href={href}
      rel="noopener noreferrer nofollow"
      className={`${base} ${className}`}
    >
      {label}
    </a>
  );
}
