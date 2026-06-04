import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="text-6xl mb-6">🔍</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Seite nicht gefunden</h1>
      <p className="text-gray-500 mb-8">
        Diese Seite existiert nicht oder wurde verschoben. Schaue dich gerne bei unseren
        Artikeln um.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary">
          Zur Startseite
        </Link>
        <Link href="/blog" className="btn-secondary">
          Alle Artikel
        </Link>
      </div>
    </div>
  );
}
