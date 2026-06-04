import Link from 'next/link';

const colorMap: Record<string, string> = {
  ratgeber:  'bg-blue-100 text-blue-700 hover:bg-blue-200',
  tipps:     'bg-green-100 text-green-700 hover:bg-green-200',
  vergleiche:'bg-purple-100 text-purple-700 hover:bg-purple-200',
  news:      'bg-orange-100 text-orange-700 hover:bg-orange-200',
};

interface Props {
  category: string;
  slug: string;
  clickable?: boolean;
}

export default function CategoryBadge({ category, slug, clickable = false }: Props) {
  const classes = `inline-block text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors ${
    colorMap[slug] ?? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  }`;

  if (clickable) {
    return (
      <Link href={`/kategorien/${slug}`} className={classes}>
        {category}
      </Link>
    );
  }

  return <span className={classes}>{category}</span>;
}
