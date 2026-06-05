import type { Article } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ARTIKEL-DATEN  –  hier kannst du Inhalte einfach anpassen oder neue hinzufügen
// ─────────────────────────────────────────────────────────────────────────────

export const articles: Article[] = [
  // ── ARTIKEL 1 ──────────────────────────────────────────────────────────────
  {
    slug: 'einstieg-in-deine-nische',
    title: 'Der ultimative Einstieg in [Deine Nische]: Alles, was du wissen musst',
    metaTitle: 'Einstieg in [Deine Nische] – Kompletter Anfänger-Guide 2024',
    metaDescription:
      'Du willst mit [Deine Nische] starten? Unser Schritt-für-Schritt-Guide erklärt Grundlagen, häufige Fehler und die besten Tipps für Einsteiger.',
    category: 'Ratgeber',
    categorySlug: 'ratgeber',
    date: '2024-05-15',
    readTime: 8,
    featured: true,
    excerpt:
      'Als Einsteiger in [Deine Nische] fühlt man sich schnell überwältigt. Dieser Guide nimmt dich an die Hand und erklärt, wie du Schritt für Schritt vorgehst.',
    intro:
      '[Deine Nische] boomt – immer mehr Menschen interessieren sich für das Thema und suchen verlässliche Informationen. Doch gerade für Anfänger ist der Einstieg oft schwierig: Wo fängt man an? Was sind die größten Fallstricke? Und welche Ressourcen lohnen sich wirklich?\n\nIn diesem Ratgeber bekommst du einen strukturierten Überblick: von den absoluten Grundlagen bis hin zu konkreten ersten Schritten, die du noch heute umsetzen kannst.',
    sections: [
      {
        heading: 'Was ist [Deine Nische] überhaupt?',
        content:
          '[Deine Nische] bezeichnet [kurze Definition einsetzen]. Es handelt sich dabei um einen Bereich, der in den letzten Jahren stark an Bedeutung gewonnen hat – sowohl für Privatpersonen als auch für Unternehmen.\n\nDie wichtigsten Aspekte auf einen Blick:\n\n[Aspekt 1] spielt eine zentrale Rolle, weil… [Aspekt 2] ermöglicht es dir, … [Aspekt 3] ist besonders für Einsteiger relevant, da…\n\nWenn du diese Grundkonzepte verstehst, hast du bereits einen entscheidenden Vorteil gegenüber vielen anderen Einsteigern.',
        tips: [
          'Starte mit dem Grundlagenwissen, bevor du in Details gehst.',
          'Nutze seriöse Quellen und vergleiche mehrere Meinungen.',
          'Halte deine ersten Schritte bewusst klein und messbar.',
        ],
      },
      {
        heading: 'Die 5 häufigsten Anfängerfehler (und wie du sie vermeidest)',
        content:
          'Viele Einsteiger machen dieselben Fehler – das kostet Zeit, Geld und Motivation. Hier sind die fünf häufigsten Stolperfallen:\n\n**Fehler 1: Zu schnell zu viel wollen.** Geduld ist in [Deine Nische] entscheidend. Wer überstürzt vorgeht, verliert schnell den Überblick.\n\n**Fehler 2: Falsche Informationsquellen.** Im Internet kursieren viele veraltete oder fehlerhafte Ratschläge. Prüfe immer, wie aktuell eine Quelle ist.\n\n**Fehler 3: Kein klares Ziel.** Ohne konkretes Ziel fehlt die Orientierung. Definiere, was du mit [Deine Nische] erreichen möchtest.\n\n**Fehler 4: Zu viele Tools gleichzeitig.** Konzentriere dich zunächst auf wenige, bewährte Werkzeuge oder Methoden.\n\n**Fehler 5: Kein Netzwerk aufbauen.** Der Austausch mit Gleichgesinnten beschleunigt deinen Lernprozess enorm.',
        adPlaceholder: true,
      },
      {
        heading: 'Dein Einstiegsplan: Die ersten 30 Tage',
        content:
          'Ein strukturierter Einstieg macht den Unterschied. Hier ist ein bewährter 30-Tage-Plan:\n\n**Woche 1 – Grundlagen:** Lese [Empfehlung einsetzen] und mache dich mit den Basisbegriffen vertraut. Ziel: Du kennst die 10 wichtigsten Fachbegriffe.\n\n**Woche 2 – Erste Praxis:** Setze eine kleine, überschaubare Aufgabe um. Ziel: Erste praktische Erfahrung sammeln.\n\n**Woche 3 – Vertiefung:** Recherchiere gezielt zu deinem spezifischen Interessenbereich. Ziel: Einen Schwerpunkt entwickeln.\n\n**Woche 4 – Community:** Tritt einer relevanten Community bei und stelle deine ersten Fragen. Ziel: Netzwerk starten.',
        tips: [
          'Halte deinen Fortschritt schriftlich fest – das motiviert und zeigt dir, wie weit du schon gekommen bist.',
          'Setze dir realistische Wochenziele statt zu großer Monatsziele.',
          'Plane feste Zeiten für das Thema ein, z.B. 30 Minuten täglich.',
        ],
        affiliate: {
          title: '📚 Empfehlenswerte Ressource für Einsteiger',
          description:
            '[Produkt-/Kursname einsetzen] ist eine der beliebtesten Ressourcen für Einsteiger in [Deine Nische]. Über [X] zufriedene Nutzer sprechen für sich.',
          linkText: 'Jetzt ansehen →',
          href: '#affiliate-link-hier-einsetzen',
          disclaimer: '* Affiliate-Link – wir erhalten ggf. eine Provision, für dich entstehen keine Mehrkosten.',
        },
        recommendations: [
          {
            badge: 'Unsere Empfehlung für Einsteiger',
            productType: 'Einsteiger-Set',
            benefit: 'Alles Wichtige für den Start – komplett und sofort einsatzbereit.',
            targetAudience: 'Ideal für alle, die ohne langes Suchen direkt loslegen wollen.',
            linkText: 'Jetzt ansehen →',
            href: '#affiliate-link',
            highlight: true,
          },
          {
            badge: 'Günstige Grundausstattung',
            productType: 'Budget-Set',
            benefit: 'Solide Qualität zum kleinen Preis – perfekt zum Ausprobieren.',
            targetAudience: 'Für alle, die erst testen möchten, bevor sie mehr investieren.',
            linkText: 'Zum Angebot →',
            href: '#affiliate-link',
          },
        ],
      },
      {
        heading: 'Die besten kostenlosen Ressourcen',
        content:
          'Du musst nicht viel Geld ausgeben, um in [Deine Nische] einzusteigen. Diese kostenlosen Quellen sind ein solider Startpunkt:\n\n**Online-Communities:** Foren und Reddit-Communities bieten Erfahrungsberichte und gegenseitige Hilfe.\n\n**YouTube:** Zahlreiche Creator bieten hochwertige Tutorials für jeden Level.\n\n**Blogs und Websites:** Spezialisierte Websites wie diese hier sind oft aktueller als Bücher.\n\n**Podcasts:** Ideal für unterwegs – viele Experten teilen ihr Wissen in regelmäßigen Folgen.',
      },
    ],
    conclusion:
      'Der Einstieg in [Deine Nische] muss kein Kraftakt sein – mit dem richtigen Plan und den passenden Ressourcen gelingt er auch ohne Vorwissen. Das Wichtigste: Fang an. Perfekte Vorbereitung gibt es nicht. Jeder Schritt, den du heute machst, bringt dich deinem Ziel näher.\n\nHast du Fragen oder eigene Erfahrungen? Teile sie in den Kommentaren – wir freuen uns über den Austausch.',
    tags: ['Einsteiger', 'Grundlagen', 'Guide', 'Anleitung'],
  },

  // ── ARTIKEL 2 ──────────────────────────────────────────────────────────────
  {
    slug: 'top-produkte-vergleich',
    title: 'Die 5 besten [Produkte/Tools] für [Deine Nische] im Vergleich 2024',
    metaTitle: 'Beste [Produkte] für [Deine Nische] 2024 – Test & Vergleich',
    metaDescription:
      'Welches [Produkt/Tool] lohnt sich wirklich? Wir haben die 5 beliebtesten Optionen getestet und vergleichen Preis, Leistung und Eignung für verschiedene Bedürfnisse.',
    category: 'Vergleiche',
    categorySlug: 'vergleiche',
    date: '2024-06-01',
    readTime: 10,
    featured: true,
    excerpt:
      'Angebot gibt es viele – aber welches [Produkt] passt wirklich zu deinen Anforderungen? Unser ehrlicher Vergleich spart dir Zeit und Geld.',
    intro:
      'Der Markt für [Produkte in Deiner Nische] ist groß und unübersichtlich. Ständig kommen neue Angebote hinzu, Preise ändern sich und es ist schwer, den Überblick zu behalten.\n\nWir haben fünf der meistgekauften und bestbewerteten Optionen unter die Lupe genommen. Das Ergebnis: Eine ehrliche Einschätzung, die dir die Kaufentscheidung erleichtert.',
    sections: [
      {
        heading: 'Unsere Testmethodik',
        content:
          'Damit du unserem Vergleich vertrauen kannst, erklären wir kurz, wie wir vorgegangen sind:\n\nWir haben jedes Produkt nach denselben Kriterien bewertet: **Preis-Leistungs-Verhältnis**, **Benutzerfreundlichkeit**, **Funktionsumfang**, **Kundensupport** und **Nachhaltigkeit/Qualität**.\n\nJedes Produkt wurde über mehrere Wochen getestet. Unsere Bewertung basiert auf eigenen Erfahrungen sowie ausgewerteten Nutzerbewertungen aus verschiedenen Quellen.',
        adPlaceholder: true,
      },
      {
        heading: 'Platz 1: [Produkt A] – Unser Testsieger',
        content:
          '**Preis:** ab [X] € | **Bewertung:** ★★★★★\n\n[Produkt A] überzeugt durch seine intuitive Bedienung und das hervorragende Preis-Leistungs-Verhältnis. Besonders Einsteiger profitieren von der schnellen Einarbeitungszeit.\n\n**Stärken:** [Eigenschaft 1], [Eigenschaft 2], [Eigenschaft 3]\n**Schwächen:** [Einschränkung 1]\n\n**Für wen geeignet?** Ideal für Einsteiger und alle, die Wert auf einfache Handhabung legen.',
        affiliate: {
          title: '🏆 Testsieger: [Produkt A]',
          description:
            'Aktuell zum besten Preis erhältlich. Mehr als [X.000] zufriedene Kunden – unser klare Empfehlung für Einsteiger.',
          linkText: 'Zum besten Preis ansehen →',
          href: '#affiliate-link-produkt-a',
          disclaimer: '* Affiliate-Link – wir erhalten ggf. eine Provision, für dich entstehen keine Mehrkosten.',
        },
      },
      {
        heading: 'Platz 2–5: Die Alternativen im Überblick',
        content:
          '**Platz 2: [Produkt B]** – ★★★★☆\nDie Premium-Alternative mit mehr Funktionen. Empfehlenswert für Fortgeschrittene, die das volle Potenzial ausschöpfen möchten. Preis: ab [Y] €.\n\n**Platz 3: [Produkt C]** – ★★★★☆\nDas beste Budget-Angebot. Wer wenig ausgeben möchte, aber keine Kompromisse bei der Kernfunktion eingehen will, trifft hier eine gute Wahl. Preis: ab [Z] €.\n\n**Platz 4: [Produkt D]** – ★★★☆☆\nSolide Mittelklasse, aber im Vergleich zu den Plätzen 1–3 gibt es wenig Alleinstellungsmerkmale. Nur empfehlenswert, wenn die spezifische Funktion [X] benötigt wird.\n\n**Platz 5: [Produkt E]** – ★★★☆☆\nViel Marketingversprechen, im Test leider hinter den Erwartungen zurückgeblieben. Nicht unsere erste Empfehlung.',
        tips: [
          'Vergleiche immer den Gesamtpreis inkl. Zubehör, Versand und ggf. Folgekosten.',
          'Achte auf die Rückgabebedingungen – bei Unsicherheit lohnt sich ein Anbieter mit großzügigem Rückgaberecht.',
          'Lies Nutzerbewertungen auf mehreren Plattformen, nicht nur auf der Produktseite.',
        ],
      },
      {
        heading: 'Unser Fazit: Welches Produkt lohnt sich?',
        content:
          'Die Wahl hängt von deinen persönlichen Anforderungen ab. Als Faustregel:\n\n- **Einsteiger:** → [Produkt A] oder [Produkt C]\n- **Fortgeschrittene:** → [Produkt B]\n- **Knappes Budget:** → [Produkt C]\n- **Profi-Einsatz:** → [Produkt B] mit Erweiterung [X]',
        recommendations: [
          {
            badge: 'Unsere Empfehlung für Einsteiger',
            productType: 'Einsteiger-Set',
            benefit: 'Einfacher Einstieg mit allem, was du wirklich brauchst.',
            targetAudience: 'Für Anfänger, die schnell und sicher starten wollen.',
            linkText: 'Jetzt ansehen →',
            href: '#affiliate-link',
            highlight: true,
          },
          {
            badge: 'Bestes platzsparendes Setup',
            productType: 'Kompaktes Setup',
            benefit: 'Maximale Funktion auf kleinstem Raum – ohne Abstriche.',
            targetAudience: 'Für alle mit wenig Platz, die trotzdem nichts vermissen möchten.',
            linkText: 'Mehr erfahren →',
            href: '#affiliate-link',
          },
          {
            badge: 'Günstige Grundausstattung',
            productType: 'Budget-Set',
            benefit: 'Das Wesentliche zu einem fairen Preis – ideal zum Einstieg.',
            targetAudience: 'Für preisbewusste Käufer und alle, die erst testen möchten.',
            linkText: 'Zum Angebot →',
            href: '#affiliate-link',
          },
          {
            badge: 'Premium-Setup für kleine Räume',
            productType: 'Premium-Kompakt-Setup',
            benefit: 'Höchste Qualität auf geringstem Raum – für wählerische Nutzer.',
            targetAudience: 'Für Anspruchsvolle, die auch auf kleinem Raum das Beste erwarten.',
            linkText: 'Jetzt entdecken →',
            href: '#affiliate-link',
          },
        ],
      },
    ],
    conclusion:
      'Ein guter Vergleich spart Zeit und Geld. Unser Testsieger [Produkt A] überzeugt durch das ausgewogene Gesamtpaket – besonders für Einsteiger. Wer mehr Leistung braucht, ist mit [Produkt B] besser bedient.\n\n**Hinweis:** Preise und Verfügbarkeit können sich ändern. Bitte prüfe die aktuellen Angebote direkt beim Anbieter.',
    tags: ['Vergleich', 'Test', 'Produkte', 'Empfehlungen'],
  },

  // ── ARTIKEL 3 ──────────────────────────────────────────────────────────────
  {
    slug: '10-tipps-fuer-fortgeschrittene',
    title: '10 Tipps für Fortgeschrittene: So holst du mehr aus [Deine Nische] heraus',
    metaTitle: '[Deine Nische] Tipps für Fortgeschrittene – 10 Profi-Tricks 2024',
    metaDescription:
      'Du kennst die Grundlagen von [Deine Nische]? Diese 10 fortgeschrittenen Tipps bringen dich auf das nächste Level und sparen dir Zeit und Aufwand.',
    category: 'Tipps & Tricks',
    categorySlug: 'tipps',
    date: '2024-06-10',
    readTime: 7,
    featured: false,
    excerpt:
      'Grundlagen kennst du schon? Diese 10 Profi-Tipps helfen dir, effizienter zu werden und häufige Fehler von Fortgeschrittenen zu vermeiden.',
    intro:
      'Wer die Grundlagen von [Deine Nische] gemeistert hat, stößt irgendwann auf eine Plateau-Phase: Fortschritte kommen langsamer, die Motivation sinkt und man fragt sich, wie man wieder vorwärtskommt.\n\nDiese 10 Tipps sind das Ergebnis von Gesprächen mit erfahrenen Praktikern und eigener Recherche. Sie funktionieren – vorausgesetzt, du setzt sie konsequent um.',
    sections: [
      {
        heading: 'Tipps 1–5: Effizienz und Methodik',
        content:
          '**Tipp 1: Automatisiere wiederkehrende Aufgaben.**\nViele Einsteiger erledigen Dinge manuell, die sich problemlos automatisieren lassen. Investiere einmal Zeit in die Einrichtung und spare dauerhaft.\n\n**Tipp 2: Nutze Daten statt Bauchgefühl.**\nMesse deine Ergebnisse regelmäßig. Konkrete Zahlen zeigen dir, was funktioniert und was nicht.\n\n**Tipp 3: Fokus auf 20 % der Maßnahmen, die 80 % des Ergebnisses bringen.**\nDas Pareto-Prinzip gilt auch in [Deine Nische]. Identifiziere deine Hebel.\n\n**Tipp 4: Lerne von den Besten.**\nAnalysiere, was erfolgreiche Menschen in [Deine Nische] anders machen. Kopiere nicht blind, aber lasse dich inspirieren.\n\n**Tipp 5: Dokumentiere deinen Prozess.**\nSchriftliche Notizen zu deinen Erfahrungen sind Gold wert – für dich selbst und für andere.',
        tips: [
          'Tools wie [Tool-Platzhalter] helfen bei der Automatisierung von Standardaufgaben.',
          'Ein einfaches Spreadsheet reicht oft schon für solide Datenauswertung.',
        ],
        adPlaceholder: true,
      },
      {
        heading: 'Tipps 6–10: Wachstum und Community',
        content:
          '**Tipp 6: Teile dein Wissen.**\nWer anderen hilft, lernt selbst am meisten. Blogge, poste in Foren oder halte kleine Workshops.\n\n**Tipp 7: Suche gezielt Feedback.**\nNicht jede Kritik ist wertvoll – aber gezieltes Feedback von Experten ist unbezahlbar.\n\n**Tipp 8: Investiere in Weiterbildung.**\nEin guter Kurs oder ein fachspezifisches Buch zahlt sich langfristig aus.\n\n**Tipp 9: Baue Systeme, keine Insellösungen.**\nEinzelne Maßnahmen sind gut – ein kohärentes System ist besser. Denke größer.\n\n**Tipp 10: Habe Geduld mit dir selbst.**\nFortschritt ist selten linear. Schlechte Phasen gehören dazu – entscheidend ist, wie du damit umgehst.',
        affiliate: {
          title: '📖 Weiterbildungs-Empfehlung für Fortgeschrittene',
          description:
            '[Kurs/Buch-Name] vermittelt fortgeschrittene Konzepte aus [Deine Nische] praxisnah und verständlich. Viele Nutzer berichten von messbaren Verbesserungen nach nur wenigen Wochen.',
          linkText: 'Mehr erfahren →',
          href: '#affiliate-link-weiterbildung',
          disclaimer: '* Affiliate-Link – wir erhalten ggf. eine Provision, für dich entstehen keine Mehrkosten.',
        },
      },
    ],
    conclusion:
      'Fortschritt in [Deine Nische] braucht keine Magie – nur Konsequenz, die richtigen Methoden und gelegentlich einen frischen Blick von außen. Welcher dieser Tipps ist für dich am hilfreichsten? Schreib es uns in die Kommentare!',
    tags: ['Tipps', 'Fortgeschrittene', 'Produktivität', 'Wachstum'],
  },

  // ── ARTIKEL 4 ──────────────────────────────────────────────────────────────
  {
    slug: 'haeufige-fragen-faq',
    title: 'Die 15 häufigsten Fragen zu [Deine Nische] – und unsere ehrlichen Antworten',
    metaTitle: 'FAQ: [Deine Nische] – Häufige Fragen beantwortet',
    metaDescription:
      'Wir beantworten die 15 häufigsten Fragen zu [Deine Nische]: von Kosten und Zeitaufwand bis zu typischen Missverständnissen.',
    category: 'Ratgeber',
    categorySlug: 'ratgeber',
    date: '2024-06-20',
    readTime: 6,
    featured: false,
    excerpt:
      'Was kostet es? Wie lange dauert es? Ist es sicher? Wir sammeln die häufigsten Fragen zu [Deine Nische] und antworten ehrlich.',
    intro:
      'Jeden Tag erreichen uns ähnliche Fragen zu [Deine Nische]. Das zeigt uns, dass viele Menschen ähnliche Unsicherheiten und Wissenslücken haben – ganz unabhängig von ihrem Erfahrungsstand.\n\nDaher haben wir die 15 meistgestellten Fragen gesammelt und beantwortet. Ohne Marketingblabla, ohne Ausweichen.',
    sections: [
      {
        heading: 'Grundlegende Fragen',
        content:
          '**Frage 1: Was genau ist [Deine Nische]?**\n[Klare, verständliche Definition einsetzen.]\n\n**Frage 2: Für wen ist [Deine Nische] geeignet?**\n[Deine Nische] ist grundsätzlich für [Zielgruppe A], [Zielgruppe B] und [Zielgruppe C] interessant. Nicht geeignet ist es, wenn…\n\n**Frage 3: Brauche ich Vorkenntnisse?**\nNein. Mit den richtigen Ressourcen (wie unserem Einsteiger-Guide) kannst du ohne Vorwissen starten.\n\n**Frage 4: Wie lange dauert es, bis man Ergebnisse sieht?**\nDas hängt stark von [Faktor A] und [Faktor B] ab. Realistisch sind erste Ergebnisse nach [Zeitraum einsetzen].\n\n**Frage 5: Was kostet der Einstieg?**\nDer Einstieg ist mit [Betrag] € bis [Betrag] € möglich. Für professionelle Anwendungen sollte man mit [Betrag] € rechnen.',
        adPlaceholder: true,
      },
      {
        heading: 'Häufige Missverständnisse',
        content:
          '**Frage 6: Ist [Deine Nische] legal?**\nJa, [Deine Nische] ist in Deutschland legal. Achte jedoch auf [spezifische Regelung].\n\n**Frage 7: Kann ich mit [Deine Nische] Geld verdienen?**\nJa, aber übertriebene Versprechen sind Skepsis angebracht. Realistisch sind [Einschätzung einsetzen].\n\n**Frage 8: Ist [Deine Nische] sicher?**\n[Ehrliche Einschätzung zu Risiken und wie man sie minimiert.]\n\n**Frage 9: Muss ich jeden Tag daran arbeiten?**\nNein, aber Regelmäßigkeit hilft. Schon [Zeiteinheit] pro Woche reichen für spürbare Fortschritte.\n\n**Frage 10: Welche Fehler machen Anfänger am häufigsten?**\nDie häufigsten Fehler haben wir in unserem [Link zum Ratgeber-Artikel] ausführlich beschrieben.',
        tips: [
          'Bei rechtlichen Fragen immer einen Experten hinzuziehen – allgemeine Ratschläge ersetzen keine Fachberatung.',
          'Vertraue keinen Versprechungen, die unrealistisch klingen. Seriöse Anbieter sind transparent über Chancen und Risiken.',
        ],
      },
      {
        heading: 'Praxis-Fragen',
        content:
          '**Frage 11: Welche Tools brauche ich?**\nZum Start reichen [Tool 1] und [Tool 2]. Fortgeschrittene nutzen zusätzlich [Tool 3].\n\n**Frage 12: Gibt es eine Community?**\nJa! Schau dir [Community-Plattform] an – dort findest du Gleichgesinnte und viel Erfahrungswissen.\n\n**Frage 13: Was sind die besten Bücher/Kurse?**\nUnsere Empfehlungen findest du im [Ressourcen-Artikel]-Artikel.\n\n**Frage 14: Wie finde ich einen Mentor?**\nAktivität in Communities, das Teilen eigener Erfahrungen und das Stellen guter Fragen öffnen viele Türen.\n\n**Frage 15: Was sind die nächsten Trends in [Deine Nische]?**\nWir beobachten aktuell [Trend 1] und [Trend 2] als besonders vielversprechend.',
        affiliate: {
          title: '💡 Unser Tool-Tipp für Einsteiger',
          description:
            '[Tool-Name] macht den Einstieg in [Deine Nische] besonders leicht. Kostenlose Testversion verfügbar.',
          linkText: 'Kostenlos testen →',
          href: '#affiliate-link-tool',
          disclaimer: '* Affiliate-Link – wir erhalten ggf. eine Provision, für dich entstehen keine Mehrkosten.',
        },
      },
    ],
    conclusion:
      'Du hast eine Frage, die hier nicht beantwortet wurde? Schreib uns – wir ergänzen diese Liste regelmäßig. Und wenn dir dieser FAQ-Artikel geholfen hat, teile ihn gerne mit anderen, die sich für [Deine Nische] interessieren.',
    tags: ['FAQ', 'Fragen', 'Antworten', 'Einsteiger'],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.categorySlug === categorySlug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getLatestArticles(count = 6): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
