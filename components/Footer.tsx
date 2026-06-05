import Link from 'next/link';

const footerLinks = {
  Themen: [
    { label: 'Ratgeber', href: '/kategorien/ratgeber' },
    { label: 'Tipps & Tricks', href: '/kategorien/tipps' },
    { label: 'Vergleiche', href: '/kategorien/vergleiche' },
    { label: 'News & Trends', href: '/kategorien/news' },
  ],
  Website: [
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Alle Artikel', href: '/blog' },
    { label: 'Transparenz', href: '/transparenz' },
  ],
  Rechtliches: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Transparenz', href: '/transparenz' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      {/* Affiliate-Hinweis Banner */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <p className="text-xs text-amber-800 text-center">
            <strong>Hinweis:</strong> Einige Links auf dieser Seite können Affiliate-Links sein.
            Wenn du darüber kaufst, erhalten wir eventuell eine Provision.
            Für dich entstehen keine Mehrkosten.{' '}
            <Link href="/transparenz" className="underline hover:text-amber-900">
              Mehr erfahren
            </Link>
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-brand-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="font-semibold text-gray-900">Ratgeber Nische</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Dein unabhängiger Ratgeber für [Deine Nische]. Praxisnah, ehrlich, aktuell.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-semibold text-gray-900 text-sm mb-3">{group}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-brand-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">
            © {year} Ratgeber Nische. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-gray-400">
            Mit ♥ erstellt · Powered by{' '}
            <span className="text-brand-500">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
