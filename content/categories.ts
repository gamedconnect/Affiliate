import type { Category } from './types';

export const categories: Category[] = [
  {
    slug: 'ratgeber',
    name: 'Ratgeber',
    description: 'Ausführliche Guides und Schritt-für-Schritt-Anleitungen rund um [Deine Nische].',
    color: 'blue',
  },
  {
    slug: 'tipps',
    name: 'Tipps & Tricks',
    description: 'Praktische Alltagstipps für mehr Effizienz und bessere Ergebnisse.',
    color: 'green',
  },
  {
    slug: 'vergleiche',
    name: 'Vergleiche',
    description: 'Produkte und Anbieter im direkten Vergleich – damit du die beste Wahl triffst.',
    color: 'purple',
  },
  {
    slug: 'news',
    name: 'News & Trends',
    description: 'Aktuelle Entwicklungen und neue Trends aus dem Bereich [Deine Nische].',
    color: 'orange',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
