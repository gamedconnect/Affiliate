import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Wer steckt hinter Ratgeber Nische? Unser Ansatz, unsere Werte und warum wir dieses Projekt gestartet haben.',
};

export default function UeberUnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-2xl mb-4">
          <span className="text-3xl">👋</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Über uns</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Wir sind [Dein Name / Team-Name] – und wir möchten dir helfen, in [Deine Nische]
          fundierte Entscheidungen zu treffen.
        </p>
      </div>

      <div className="space-y-8">
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Wer steckt dahinter?</h2>
          <p className="text-gray-700 leading-relaxed">
            [Hier deine persönliche Geschichte einsetzen: Wer bist du? Warum interessierst du
            dich für diese Nische? Was qualifiziert dich, darüber zu schreiben?]
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Wir haben [Ratgeber Nische] gegründet, weil wir selbst lange nach verlässlichen
            Informationen zu [Deine Nische] gesucht haben – und zu oft auf oberflächliche
            Inhalte oder versteckte Werbung gestoßen sind.
          </p>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Unser Ansatz</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '🔍', title: 'Gründliche Recherche', desc: 'Wir prüfen Quellen sorgfältig und geben nur Empfehlungen, hinter denen wir stehen.' },
              { icon: '📖', title: 'Verständliche Sprache', desc: 'Fachliches Wissen klar erklärt – auch für Einsteiger ohne Vorkenntnisse.' },
              { icon: '🔄', title: 'Regelmäßige Updates', desc: 'Inhalte werden aktuell gehalten, damit du keine veralteten Informationen bekommst.' },
              { icon: '🛡️', title: 'Transparenz', desc: 'Klare Kennzeichnung aller kommerziellen Inhalte und Affiliate-Links.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-semibold text-sm text-gray-900 mb-1">{item.title}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Unsere Themen</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wir schreiben zu den folgenden Bereichen rund um [Deine Nische]:
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              'Ratgeber und Schritt-für-Schritt-Anleitungen für Einsteiger',
              'Produkt- und Anbietervergleiche mit ehrlichen Bewertungen',
              'Praxistipps für Fortgeschrittene',
              'Aktuelle News und Trends',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="flex-shrink-0 text-brand-500 mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-brand-50 border border-brand-100 rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Kontakt & Feedback</h2>
          <p className="text-sm text-gray-600 mb-4">
            Hast du Fragen, Anregungen oder einen Fehler entdeckt? Wir freuen uns über deine
            Nachricht.
          </p>
          <Link href="/impressum" className="btn-primary">
            Kontakt aufnehmen
          </Link>
        </section>
      </div>
    </div>
  );
}
