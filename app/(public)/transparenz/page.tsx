import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transparenz – Affiliate & Werbung',
  description:
    'Wie finanziert sich Ratgeber Nische? Alle Informationen zu Affiliate-Links, Werbung und unseren redaktionellen Grundsätzen.',
};

export default function TransparenzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Transparenz</h1>
      <p className="text-gray-500 mb-8">Zuletzt aktualisiert: Januar 2024</p>

      <div className="prose-article space-y-8">
        {/* Section 1 */}
        <section className="card p-6 border-l-4 border-brand-500">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Über diese Website</h2>
          <p>
            Ratgeber Nische ist ein unabhängiges redaktionelles Projekt. Unser Ziel ist es, dir
            fundierte, praxisnahe und ehrliche Inhalte zu [Deine Nische] zu liefern – ohne
            Werbeversprechen und ohne Interessen Dritter, die unsere Inhalte beeinflussen.
          </p>
          <p className="mt-3">
            Damit wir dieses Projekt betreiben und weiterentwickeln können, setzen wir auf
            verschiedene Einnahmequellen, die wir hier vollständig offenlegen.
          </p>
        </section>

        {/* Section 2 */}
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Affiliate-Links</h2>
          <p>
            Einige Links auf dieser Website sind sogenannte Affiliate-Links. Das bedeutet: Wenn
            du auf einen solchen Link klickst und anschließend ein Produkt kaufst oder eine
            Dienstleistung buchst, erhalten wir eine kleine Provision vom jeweiligen Anbieter.
          </p>
          <p className="mt-3">
            <strong>Für dich entstehen dabei keine Mehrkosten.</strong> Der Preis, den du zahlst,
            ist derselbe wie bei einem direkten Kauf – oder sogar günstiger durch Sonderkonditionen.
          </p>
          <p className="mt-3">
            Unsere Redaktion bewertet Produkte und Dienstleistungen <strong>unabhängig</strong> von
            etwaigen Provisionen. Wir empfehlen nur, wovon wir selbst überzeugt sind oder was uns
            aufgrund von Nutzerfeedback und Recherche als empfehlenswert gilt.
          </p>
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Kennzeichnung:</strong> Affiliate-Links sind in Artikeln stets gekennzeichnet –
              entweder direkt im Text oder in der zugehörigen CTA-Box mit dem Hinweis
              <em> „* Affiliate-Link"</em>.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Werbung</h2>
          <p>
            Diese Website kann Werbeanzeigen von Drittanbietern enthalten. Werbeplätze sind
            optisch klar als <strong>„Anzeige"</strong> gekennzeichnet und von redaktionellen
            Inhalten getrennt.
          </p>
          <p className="mt-3">
            Aktuell werden Werbeplätze als Platzhalter dargestellt. Sobald Werbepartner
            eingebunden werden, erfolgt dies ausschließlich über seriöse Netzwerke oder direkte
            Partnerschaften, die zu unserer Nische passen.
          </p>
          <p className="mt-3">
            <strong>Wichtig:</strong> Werbetreibende haben keinen Einfluss auf unsere redaktionellen
            Inhalte, Bewertungen oder Empfehlungen.
          </p>
        </section>

        {/* Section 4 */}
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Gesponserte Inhalte</h2>
          <p>
            Falls wir jemals gesponserte Artikel oder bezahlte Inhalte veröffentlichen, werden
            diese am Anfang des Artikels deutlich als <strong>„Gesponsert"</strong> oder
            <strong>„Anzeige"</strong> markiert.
          </p>
          <p className="mt-3">
            Aktuell sind alle Artikel auf dieser Website redaktionell und nicht gesponsert.
          </p>
        </section>

        {/* Section 5 */}
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Unsere Grundsätze</h2>
          <ul className="space-y-3">
            {[
              'Wir empfehlen nur Produkte und Dienste, hinter denen wir stehen.',
              'Redaktionelle Unabhängigkeit hat Vorrang vor finanziellen Interessen.',
              'Wir kennzeichnen alle kommerziellen Inhalte transparent und klar.',
              'Wir aktualisieren Inhalte regelmäßig, um Aktualität und Richtigkeit zu gewährleisten.',
              'Bei Fehlern oder veralteten Informationen freuen wir uns über Hinweise.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="flex-shrink-0 text-green-500 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section className="bg-brand-50 border border-brand-100 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Fragen zur Transparenz?</h2>
          <p className="text-sm text-gray-600">
            Wenn du Fragen zu unseren Einnahmequellen, Kooperationen oder redaktionellen Abläufen
            hast, wende dich gerne an uns. Die Kontaktdaten findest du im{' '}
            <Link href="/impressum" className="text-brand-600 underline">Impressum</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
