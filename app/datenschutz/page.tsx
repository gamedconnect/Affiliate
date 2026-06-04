import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung gemäß DSGVO.',
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

      <div className="card p-6 mb-6 border-l-4 border-amber-400 bg-amber-50">
        <p className="text-sm text-amber-800">
          <strong>Platzhalter:</strong> Diese Datenschutzerklärung ist ein Muster und muss an
          deine konkrete Website-Konfiguration angepasst werden. Lass sie im Zweifel von einem
          Rechtsanwalt prüfen.
        </p>
      </div>

      <div className="prose-article space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Datenschutz auf einen Blick</h2>
          <h3 className="font-semibold text-gray-800 mb-2">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen
            personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene
            Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Datenerfassung auf dieser Website</h2>
          <h3 className="font-semibold text-gray-800 mb-2">Wer ist verantwortlich?</h3>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
            Die Kontaktdaten findest du im <Link href="/impressum" className="text-brand-600 underline">Impressum</Link>.
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">Server-Log-Dateien</h3>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
            Server-Log-Dateien, die dein Browser automatisch übermittelt. Dies sind: Browsertyp
            und -version, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden
            Rechners sowie Uhrzeit der Serveranfrage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Hosting</h2>
          <p>
            Diese Website wird auf Vercel gehostet. Vercel ist ein Dienst der Vercel Inc., 440
            N Barranca Ave #4133, Covina, CA 91723, USA. Details zur Datenverarbeitung durch
            Vercel findest du in der{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 underline"
            >
              Datenschutzerklärung von Vercel
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Affiliate-Links und externe Dienste</h2>
          <p>
            Diese Website enthält Affiliate-Links zu Drittanbietern. Wenn du auf solche Links
            klickst, gelangst du auf die Seiten der jeweiligen Anbieter. Dort gelten die
            Datenschutzerklärungen der jeweiligen Anbieter. Wir haben keinen Einfluss auf
            deren Datenschutzpraktiken.
          </p>
          <p className="mt-3">
            Weitere Informationen zu Affiliate-Links findest du auf unserer{' '}
            <Link href="/transparenz" className="text-brand-600 underline">Transparenz-Seite</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
          <p>
            Diese Website verwendet [keine / nur technisch notwendige] Cookies. [Falls du
            Analyse- oder Marketing-Cookies einsetzt, hier detailliert beschreiben.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Deine Rechte</h2>
          <p>
            Du hast jederzeit das Recht auf Auskunft über die zu deiner Person gespeicherten
            Daten, deren Herkunft und Empfänger sowie den Zweck der Datenspeicherung.
            Außerdem hast du ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
          </p>
          <p className="mt-3">
            Kontakt: <Link href="/impressum" className="text-brand-600 underline">Impressum</Link>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Änderungen</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich gesetzliche
            Anforderungen oder unsere Dienste ändern. Die jeweils aktuelle Version ist immer
            auf dieser Seite verfügbar.
          </p>
          <p className="mt-2 text-sm text-gray-400">Stand: Januar 2024</p>
        </section>
      </div>
    </div>
  );
}
