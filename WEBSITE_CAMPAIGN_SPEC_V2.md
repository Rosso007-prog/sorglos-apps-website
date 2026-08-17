# WEBSITE_CAMPAIGN_SPEC.md
## Implementierungsauftrag für Codex, Claude Code und Hermes

### Projekt
Kampagnenseite zur Bundestagspetition 207045 für Wissens- und Kulturerhaltung bei kommerzieller destruktiver Massendigitalisierung.

### Arbeitsweise für den Coding-Agenten

Du arbeitest in einem bestehenden Website-Projekt. **Untersuche zuerst die vorhandene Architektur, Komponenten, Styles, Routing-, Build- und Deployment-Struktur.** Ersetze keine bestehende Technik ohne zwingenden Grund. Verwende vorhandene Design Tokens, Header/Footer, Analytics-/Consent-Mechanismen und Komponenten wieder.

Vor Änderungen:
1. Repository-Struktur analysieren.
2. README, package/config files, vorhandene Agent-/Projekt-MD-Dateien lesen.
3. aktuellen Build/Test/Lint-Workflow ermitteln.
4. Git-Status prüfen.
5. keine bestehenden Nutzeränderungen überschreiben.

Nach Änderungen:
1. Lint/Tests/Build ausführen.
2. offensichtliche Accessibility- und Responsive-Probleme prüfen.
3. geänderte Dateien und Testergebnisse dokumentieren.
4. Versionsnummer nur dann erhöhen, wenn das Projekt bereits eine entsprechende Versionierungsregel besitzt oder die Projektanweisungen dies verlangen.
5. keine Zugangsdaten oder Secrets committen.

### Ziel-URL

Bevorzugt:
`https://sorglos-apps.de/wissen-bewahren`

Falls die bestehende Routingstruktur eine andere Form erfordert, passend integrieren, aber keine bestehende URL brechen.

### Statusmodus

Die Seite muss zwei Zustände unterstützen:

#### `pending`
Petition ist eingereicht, aber noch nicht veröffentlicht.
- Hauptbutton: „Veröffentlichung wird geprüft“
- Button nicht auf eine erfundene URL verlinken.
- Optional zweiter Button: „Warum diese Petition?“ → interner Abschnitt.
- Kein „Jetzt mitzeichnen“, solange kein offizieller Link vorhanden ist.

#### `published`
- Hauptbutton: „Jetzt beim Deutschen Bundestag mitzeichnen“
- Ziel ausschließlich der offizielle Bundestagslink.
- externe Links mit sinnvollen Sicherheitsattributen.
- Mitzeichnungsstand nur anzeigen, wenn er aus einer verlässlichen Quelle gepflegt wird; niemals schätzen.

Konfiguration zentral halten, z. B.:
- petitionId: `207045`
- petitionStatus: `pending | published`
- officialPetitionUrl
- petitionCount optional
- petitionDeadline optional

Die konkrete Implementierung an den vorhandenen Stack anpassen.

## Inhalt und Informationsarchitektur

### Hero

Eyebrow:
`Bundestagspetition 207045`

H1:
`Ein KI-Modell ist kein Archiv.`

Lead:
`KI darf aus Büchern lernen. Unser Wissen darf dabei nicht verloren gehen.`

Kurztext:
`Die Petition setzt sich dafür ein, dass erhaltungswürdige Bücher bei kommerzieller destruktiver Massendigitalisierung geschützt und geeignete digitale Archivkopien langfristig unabhängig gesichert werden.`

CTA je Status.

Zusatz:
`Nicht gegen KI. Für Digitalisierung mit Verantwortung.`

### Sektion „Worum geht es?“

Drei Karten:

**Digitalisierung ermöglichen**
KI, Forschung und Digitalisierung sollen nicht pauschal eingeschränkt werden.

**Erhaltungswürdige Bücher schützen**
Seltene, einzigartige oder kulturhistorisch bedeutsame Exemplare sollen nicht unnötig durch destruktive Digitalisierung verloren gehen.

**Wissen langfristig sichern**
Wo eine physische Vernichtung vertretbar ist, soll eine geeignete unabhängige Langzeitarchivierung geprüft werden.

### Visualer Erklärblock

Darstellung:
`BUCH → SCAN → KI`

Darunter groß:
`Wo bleibt das Archiv?`

Erklärung:
`Ein Sprachmodell ist keine vollständige, originalgetreue und dauerhaft abrufbare Bibliothek seiner Trainingsdaten.`

Kein dramatisches Bild von Bücherverbrennungen verwenden.

### Sektion „Was die Petition fordert“

- Prüfung, ob bestehende Gesetze kommerzielle destruktive Massendigitalisierung ausreichend erfassen.
- angemessene Prüfung des Erhaltungswertes
- besonderer Schutz seltener, einzigartiger oder kulturhistorisch bedeutsamer Exemplare
- geeignete archivfähige Sicherung bei zulässiger Vernichtung
- Wahrung von Urheber-, Verwertungs- und Zugangsrechten

### Sektion „Was sie NICHT fordert“

Mit klaren positiven/neutralen Icons:
- kein generelles KI-Verbot
- kein Verbot von Digitalisierung
- keine kostenlose Veröffentlichung geschützter Bücher
- kein pauschales Erhaltungsgebot für jedes gewöhnliche Massenexemplar

### FAQ

Fragen:
1. Ist die Petition gegen KI?
2. Was ist destruktive Digitalisierung?
3. Warum reicht ein KI-Modell nicht als Archiv?
4. Sollen Scans kostenlos veröffentlicht werden?
5. Gibt es bereits Schutzgesetze?
6. Muss jedes gescannte Buch physisch erhalten bleiben?
7. Wer könnte Archivkopien langfristig sichern?

Antworten fachlich vorsichtig formulieren. Keine definitive Rechtsberatung.

### Quellen

Eigene Quellen-Sektion mit externen Links.

Mindestens:
- Deutscher Bundestag – Petitionsverfahren/Quorum
- geltende relevante deutsche Gesetzestexte (nur offizielle Quellen)
- belastbare Berichte/Primärquellen zum Thema destruktive Buchdigitalisierung

Wichtig:
- Quellen als Quellen kennzeichnen.
- Artikel nicht kopieren.
- keine langen Zitate.
- Datum des letzten Quellenchecks anzeigen.
- Behauptungen über konkrete Firmen niemals ohne belastbare Quelle.

### Mitzeichnen-CTA

Nach zentralen Abschnitten wiederholbarer CTA, aber nicht aggressiv.

Published:
`Petition beim Deutschen Bundestag mitzeichnen`

Pending:
`Petition wird derzeit vom Bundestag geprüft`

### Pressebereich

Route oder Anker:
`/wissen-bewahren#presse` oder gemäß bestehender Struktur.

Enthält:
- 30-Wörter-Kurzfassung
- 100-Wörter-Kurzfassung
- Kernzitat
- Petition-ID
- offiziellen Bundestagslink
- Kontakt-Platzhalter bzw. bestehende Kontaktmöglichkeit
- Download/Link zu Pressematerial nur, wenn Material tatsächlich im Projekt vorhanden ist

### Teilen

Share Buttons nur für vorhandene/zulässige Plattformen.
Bevorzugt native Share API auf mobilen Geräten, falls im Stack sinnvoll.
Fallback: Link kopieren.

Vorbefüllter Text:
`Ein KI-Modell ist kein Archiv. KI darf aus Büchern lernen – unser Wissen darf dabei nicht verloren gehen. Petition 207045: [URL]`

Keine Dark Patterns.

## Design

### Stil
- seriös
- modern
- ruhig
- vertrauenswürdig
- kulturell/wissenschaftlich
- keine Protest-/Alarmästhetik
- keine „AI apocalypse“-Optik
- keine NS-/Bücherverbrennungsassoziationen

### Visual-Idee
Buchseiten / Bibliotheksstruktur / abstrahierte Digitalisierung.
Wenn vorhandene Website visuell stark definiert ist, deren Stil priorisieren.

### Responsive
Mobile first.
Testbreiten mindestens:
- 360 px
- 768 px
- 1024 px
- 1440 px

Keine horizontalen Scrollbars.

## Accessibility

Mindestens:
- semantische Heading-Hierarchie
- sichtbare Fokuszustände
- Tastaturbedienbarkeit
- ausreichende Kontraste
- aussagekräftige Linktexte
- Bilder mit passenden alt-Texten; dekorative Bilder leerer alt
- `prefers-reduced-motion` beachten
- keine inhaltsrelevanten Informationen ausschließlich über Farbe vermitteln

Ziel: WCAG 2.2 AA soweit für den bestehenden Stack praktikabel.

## SEO

Title:
`Ein KI-Modell ist kein Archiv | Petition 207045`

Description:
`Bundestagspetition zum Schutz von Wissen und Kulturerbe bei kommerzieller destruktiver Massendigitalisierung für KI und andere digitale Anwendungen.`

OpenGraph/Twitter-Metadaten ergänzen, soweit bestehende Website dies unterstützt.

Canonical URL setzen.

Strukturierte Daten nur verwenden, wenn semantisch korrekt. Keine erfundenen Bewertungen, Unterstützerzahlen oder Organisationen.

## Datenschutz

- keine zusätzlichen Trackinganbieter ohne ausdrückliche Notwendigkeit
- bestehendes Consent-System respektieren
- keine personenbezogenen Daten unnötig erfassen
- keine eigene „Mitzeichnen“-Datenbank: Mitzeichnung erfolgt beim Bundestag
- Newsletter nur, wenn es bereits eine rechtlich sauber implementierte Infrastruktur gibt; andernfalls nicht hinzufügen

## Sicherheit

- externe URLs nicht aus ungeprüften Nutzereingaben rendern
- keine Secrets im Frontend
- Dependencies nicht unnötig erweitern
- vorhandene Security-Header/CSP nicht abschwächen

## Performance

- Hero nicht mit riesigen Assets belasten
- Bilder optimiert/lazy load außerhalb Hero
- keine unnötigen JS-Libraries
- bestehendes Framework-Image-Handling nutzen
- Layout Shift vermeiden

## Tracking – optional

Wenn die bestehende Website bereits internes datenschutzkonformes Tracking besitzt:
Events:
- `petition_campaign_view`
- `petition_cta_click`
- `petition_share`
- `petition_source_click`

Keine Fingerprinting-Techniken.
Keine neue externe Analytics-Plattform installieren.

## Kampagnen-Konfiguration

Es soll eine zentrale, leicht auffindbare Konfiguration geben, damit nach Veröffentlichung nicht an mehreren Stellen Änderungen nötig sind.

Beispielinhalt, angepasst an die Sprache/Architektur des Projekts:

```text
petitionId = 207045
status = pending
officialUrl = null
deadline = null
currentSignatures = null
lastVerifiedAt = YYYY-MM-DD
```

Bei `status=published` darf `officialUrl` nicht leer sein.

## Qualitätsprüfung

Vor Abschluss:
- Build erfolgreich
- Lint erfolgreich, sofern vorhanden
- Tests erfolgreich, sofern vorhanden
- interne Links geprüft
- Pending/Published-State geprüft
- CTA im Pending-State nicht fälschlich aktiv
- CTA im Published-State führt exakt zur konfigurierten offiziellen URL
- Mobile Layout geprüft
- Tastaturnavigation geprüft
- keine erfundenen Zahlen/Unterstützer/Quellen
- keine unbestätigten Logos
- keine bestehende Website-Funktion beschädigt

## Lieferumfang des Coding-Agenten

1. Implementierte Kampagnenseite
2. zentrale Petition-Konfiguration
3. ggf. wiederverwendbare Campaign-Komponenten
4. Metadaten/SEO
5. Quellen-/FAQ-Bereich
6. kurze Dokumentation in `docs/petition-207045.md` oder passend zur vorhandenen Struktur
7. Änderungsübersicht
8. Test-/Build-Ergebnisse

## Inhaltliche Leitplanke

Bei Zweifeln gilt:

**Nicht gegen KI argumentieren. Nicht dramatisieren. Keine unbelegten Behauptungen. Wissenserhaltung, Kulturerhalt, unabhängige Langzeitarchivierung und praktikable Regulierung stehen im Mittelpunkt.**

---

# Erweiterung V2 – Kampagnenbetrieb vor und nach Veröffentlichung

## 1. Öffentliche Kampagnen-URL als dauerhafte Zieladresse

Die dauerhafte öffentliche Kampagnenadresse ist:

`https://sorglos-apps.de/wissen-bewahren`

Diese URL ist die zentrale Adresse der Kampagne und soll auch auf Plakaten, Flyern, Social-Media-Motiven und in QR-Codes verwendet werden.

**Wichtig:** QR-Codes auf dauerhaftem bzw. gedrucktem Kampagnenmaterial sollen grundsätzlich auf die Kampagnen-URL und nicht direkt auf eine Bundestags-URL zeigen. Dadurch bleiben bereits verteilte Materialien auch nach einer Statusänderung gültig. Die Kampagnenseite verweist nach Veröffentlichung auf die offizielle Mitzeichnungsseite des Deutschen Bundestages.

## 2. Statusanzeige im Pending-Modus

Solange `petitionStatus = pending` gilt, muss im sichtbaren oberen Seitenbereich ein sachlicher Statushinweis stehen:

**Petition 207045 wurde beim Deutschen Bundestag eingereicht. Die Veröffentlichung wird derzeit geprüft.**

Ergänzend kann formuliert werden:

`Eine Mitzeichnung über den Deutschen Bundestag ist derzeit noch nicht möglich.`

Nicht verwenden:
- „Jetzt mitzeichnen“
- Countdown zur Mitzeichnungsfrist
- Unterstützerzahl
- Quorum-Fortschritt
- erfundene oder vermutete Bundestags-URL

Der primäre CTA kann im Pending-Modus zu `#worum-geht-es` oder einem Abschnitt `#status` führen.

## 3. Published-Modus

Nach bestätigter Veröffentlichung wird zentral umgestellt:

```text
petitionStatus = published
officialPetitionUrl = <VERIFIZIERTE OFFIZIELLE BUNDESTAG-URL>
petitionDeadline = <VERIFIZIERTES DATUM ODER null>
currentSignatures = <VERIFIZIERTE ZAHL ODER null>
lastVerifiedAt = <ZEITPUNKT DER LETZTEN PRÜFUNG>
```

Dann:
- prominenter CTA: `Jetzt beim Deutschen Bundestag mitzeichnen`
- Ziel ausschließlich `officialPetitionUrl`
- sekundärer CTA: `Warum diese Petition?`
- Kampagnen-URL bleibt die URL für QR-Codes und Teilen-Funktionen
- externe Bundestagsseite klar als solche kennzeichnen

Wenn `petitionStatus = published` und `officialPetitionUrl` leer ist, muss die Anwendung dies als Konfigurationsfehler behandeln und darf keinen Mitzeichnen-CTA rendern.

## 4. Kampagnenziel und Mitzeichnungszahlen

Ein Kampagnenziel darf von rechtlichen/parlamentarischen Schwellen sprachlich getrennt werden.

Falls die Kampagne ein Ziel wie `30.000 Mitzeichnungen` verwendet:
- klar als **Kampagnenziel** bzw. als anhand der dann geltenden Bundestagsregeln verifiziertes Ziel kennzeichnen;
- keine Aussage über automatische Rechtsfolgen ohne aktuelle offizielle Quelle;
- Quorum, Anhörung und Mitzeichnungsfrist vor Veröffentlichung bzw. vor Darstellung auf der Seite anhand einer offiziellen Bundestagsquelle prüfen;
- `currentSignatures` niemals schätzen oder aus Social-Media-Zahlen ableiten.

Optionales Datenmodell:

```text
campaignGoal = null | number
campaignGoalLabel = null | string
quorum = null | number
quorumSourceUrl = null | string
```

Diese Werte dürfen nur sichtbar werden, wenn sie verifiziert und `lastVerifiedAt` gesetzt sind.

## 5. Zielgruppenbereiche

Die Seite erhält einen Abschnitt `#unterstuetzen` mit vier Zielgruppen-Karten bzw. Unterbereichen.

### Für Bibliotheken & Archive

Kernaussage:
`Wissenserhaltung und Digitalisierung gehören zusammen.`

Inhalte:
- Petition fachlich prüfen
- innerhalb fachlicher Netzwerke teilen
- Expertise zu Bestandserhaltung und Langzeitarchivierung einbringen
- nach Veröffentlichung auf die offizielle Mitzeichnung hinweisen
- vorhandenes Kampagnenmaterial herunterladen

### Für Antiquare & Buchhandel

Kernaussage:
`Wer mit historischen Büchern arbeitet, kennt ihren Wert jenseits des reinen Textinhalts.`

Inhalte:
- Erfahrungen mit seltenen oder nicht digital verfügbaren Werken einbringen
- Petition im eigenen Netzwerk bekannt machen
- sachliche Hinweise zu Markt, Seltenheit und Erhaltungswert geben
- Kampagnenmaterial verwenden

### Für Wissenschaft & KI

Kernaussage:
`Nicht gegen KI. Für Forschung und Innovation mit Verantwortung für Kulturgut.`

Inhalte:
- fachliche Diskussion über Trainingsdaten, Reproduzierbarkeit und Archivierung
- technische Perspektiven zur Langzeitsicherung einbringen
- deutlich machen, dass die Kampagne kein generelles KI-Trainingsverbot fordert
- praktikable Lösungen unterstützen

### Für Presse & Medien

Kernaussage:
`Die Kernfrage: Was bleibt dauerhaft erhalten, wenn physische Quellen für Digitalisierung verbraucht oder zerstört werden?`

Inhalte:
- Presse-Kurzfassungen
- Kernzitat
- Petition-ID
- aktueller Status
- Pressekontakt
- verfügbare Bild-/PDF-Materialien
- ausschließlich belegbare Aussagen und Quellen

## 6. Download- und Materialbereich

Route/Anker:
`/wissen-bewahren#material`

Der Bereich wird nur mit tatsächlich vorhandenen Dateien befüllt.

Vorgesehene Kategorien:
- Hauptplakat
- Flyer
- Social-Media-Motive
- Presseinformationen
- optional Kampagnenlogo/Key Visual

Jede Datei erhält:
- eindeutigen Titel
- Dateityp
- optional Dateigröße
- kurze Zweckbeschreibung
- Download-Link

Keine nicht vorhandenen Downloads simulieren.

### Asset-Konvention

Wenn die vorhandene Projektstruktur nichts anderes vorgibt, sprechende Dateinamen verwenden, z. B.:

```text
petition-207045-hauptplakat.png
petition-207045-flyer.pdf
petition-207045-social-ki-modell-kein-archiv.png
petition-207045-presseinfo.pdf
```

## 7. QR-Code-Regel

Alle neu erzeugten QR-Codes für die allgemeine Kampagne kodieren:

`https://sorglos-apps.de/wissen-bewahren`

Der QR-Code muss technisch erzeugt werden und scanbar sein. Keine generativen/illustrierten Fake-QR-Codes verwenden.

Ausnahme: Ein ausdrücklich als `Direkt zur Bundestagspetition` bezeichnetes digitales Material darf nach Veröffentlichung zusätzlich einen QR-Code zur verifizierten offiziellen Bundestags-URL enthalten. Solche Materialien müssen eindeutig vom dauerhaften Kampagnen-QR unterschieden werden.

## 8. Teilen

Standard-Share-URL:

`https://sorglos-apps.de/wissen-bewahren`

Pending-Share-Text:

`Ein KI-Modell ist kein Archiv. Petition 207045 wurde beim Deutschen Bundestag eingereicht und wird derzeit zur Veröffentlichung geprüft. Wissen und Kulturerbe sollen bei destruktiver Massendigitalisierung nicht verloren gehen.`

Published-Share-Text:

`Ein KI-Modell ist kein Archiv. Unterstütze Petition 207045 für Wissenserhaltung und verantwortungsvolle Digitalisierung. Alle Informationen und der offizielle Mitzeichnungslink: https://sorglos-apps.de/wissen-bewahren`

Texte an Plattformlimits anpassen, ohne die Aussage zu verfälschen.

## 9. Optional: Benachrichtigung über Veröffentlichung

Keine neue Newsletter- oder E-Mail-Infrastruktur nur für diese Kampagne bauen.

Wenn im bestehenden Projekt bereits eine datenschutzkonforme Benachrichtigungs-/Newsletter-Infrastruktur vorhanden ist, kann im Pending-Modus angeboten werden:

`Informiert werden, sobald die Petition veröffentlicht ist`

Voraussetzungen:
- bestehendes Consent-/Datenschutzkonzept verwenden
- Zweck klar benennen
- Datensparsamkeit
- erforderliches Double-Opt-in verwenden, wenn die vorhandene Infrastruktur dies vorsieht
- keine Adressdaten an neue Drittanbieter übertragen

Andernfalls diesen CTA vollständig weglassen.

## 10. Aktueller Statusblock

Eine wiederverwendbare Komponente `PetitionStatus` oder entsprechend der vorhandenen Architektur implementieren.

Pending:

```text
Petition 207045
Beim Deutschen Bundestag eingereicht
Status: Veröffentlichung wird geprüft
```

Published:

```text
Petition 207045
Öffentliche Petition beim Deutschen Bundestag
Status: Mitzeichnung geöffnet
[Jetzt beim Deutschen Bundestag mitzeichnen]
```

Optional bei verifizierten Daten:
- Mitzeichnungsfrist
- aktuelle Mitzeichnungen
- letzter Datencheck

## 11. Kampagnenmaterial und Quellen strikt trennen

Die Seite muss unterscheiden zwischen:
1. offiziellen Informationen des Deutschen Bundestages,
2. externen journalistischen/wissenschaftlichen Quellen,
3. Positionen und Forderungen der Kampagne.

Die Petition bzw. Kampagne darf nicht den Eindruck erwecken, eine offizielle Seite des Deutschen Bundestages zu sein.

Daher:
- Bundestagsadler oder andere amtliche Hoheitszeichen nicht als Kampagnenbranding verwenden;
- `Deutscher Bundestag` nur sachlich zur Beschreibung der Petition/externen Zielseite verwenden;
- externe offizielle Links sichtbar kennzeichnen.

## 12. Zusätzliche Inhaltssektion: Warum ein KI-Modell kein Archiv ist

Sachliche Erklärung ohne Dramatisierung:

`Ein trainiertes KI-Modell ersetzt weder das physische Original noch eine vollständige digitale Reproduktion. Es stellt Inhalte nicht notwendigerweise vollständig, originalgetreu oder dauerhaft reproduzierbar bereit. Für Wissenserhaltung und historische Forschung bleiben deshalb Originale, bibliografische Informationen und geeignete Archivkopien eigenständige Sicherungsebenen.`

Darstellung optional als vier Ebenen:

```text
PHYSISCHES ORIGINAL
        ↓
DIGITALE REPRODUKTION
        ↓
ARCHIVIERTE KOPIE + METADATEN
        ↓
KI-/FORSCHUNGSNUTZUNG
```

Dabei nicht suggerieren, dass jede Digitalisierung zwingend alle vier Ebenen benötigt. Die Darstellung erklärt das Prinzip der unterschiedlichen Funktionen.

## 13. Unterstützungs-CTA nach Veröffentlichung

Nach Veröffentlichung kann der Bereich `#mitmachen` enthalten:

1. `Petition beim Bundestag mitzeichnen`
2. `Kampagnenseite teilen`
3. `Material herunterladen`
4. `Fachorganisation auf die Petition aufmerksam machen`

Keine automatische Massenmail-Funktion implementieren. Keine vorbefüllten Empfängerlisten im Frontend veröffentlichen. Kontaktaufnahme soll individuell und sachlich bleiben.

## 14. Pressemodus

Der Pressebereich muss dynamisch denselben zentralen Status verwenden.

### 30-Wörter-Fassung

`Petition 207045 fordert eine Prüfung des Schutzes erhaltungswürdiger Bücher bei kommerzieller destruktiver Massendigitalisierung sowie geeignete Lösungen für unabhängige Langzeitarchivierung – ohne ein generelles Verbot von KI oder Digitalisierung.`

### 100-Wörter-Fassung

`Die Bundestagspetition 207045 beschäftigt sich mit der Frage, wie Wissen und Kulturerbe erhalten werden können, wenn Bücher im Rahmen kommerzieller Massendigitalisierung physisch verändert oder zerstört werden. Gefordert wird insbesondere eine Prüfung des bestehenden Rechtsrahmens, eine angemessene Berücksichtigung des Erhaltungswertes seltener oder kulturhistorisch bedeutsamer Exemplare sowie geeignete Formen unabhängiger Langzeitarchivierung. Die Initiative richtet sich ausdrücklich nicht grundsätzlich gegen KI-Training oder Digitalisierung und fordert auch keine kostenlose Veröffentlichung urheberrechtlich geschützter Werke. Ziel ist ein praktikabler Rahmen, der technologische Innovation mit langfristiger Wissenserhaltung und Kulturgutschutz verbindet.`

### Kernzitat

`Ein KI-Modell ist kein Archiv. Digitalisierung und Innovation sind wichtig – aber Wissenserhaltung muss mitgedacht werden.`

## 15. Technischer Zustandswechsel

Der Wechsel von `pending` auf `published` muss mit möglichst wenigen Änderungen möglich sein.

Ideal:

```text
campaignConfig = {
  petitionId: "207045",
  petitionStatus: "pending",
  campaignUrl: "https://sorglos-apps.de/wissen-bewahren",
  officialPetitionUrl: null,
  petitionDeadline: null,
  currentSignatures: null,
  campaignGoal: null,
  lastVerifiedAt: "2026-08-17"
}
```

Alle Statusanzeigen, CTAs, Share-Texte und optionalen Fortschrittsanzeigen müssen daraus abgeleitet werden. Keine mehrfach hart codierten Statuswerte.

## 16. Vorbereitung für Veröffentlichung

Schon im Pending-Modus vollständig implementieren und testen:
- Published-UI
- offizieller Link als Konfigurationswert
- optionaler Signaturstand
- optionale Deadline
- Share-Texte
- CTA-Zustände

Published-Elemente bleiben bis zur tatsächlichen Veröffentlichung verborgen.

Tests müssen mindestens abdecken:

```text
pending + officialUrl=null       -> kein Mitzeichnen-Link
pending + officialUrl=gesetzt    -> trotzdem kein Mitzeichnen-Link
published + officialUrl=gesetzt  -> Mitzeichnen-Link sichtbar
published + officialUrl=null     -> sichere Fehlerbehandlung, kein falscher Link
currentSignatures=null           -> keine Zahl/Progressbar
petitionDeadline=null            -> keine erfundene Frist
```

## 17. Keine automatische Behauptung über Veröffentlichung

Der Coding-Agent darf den Status niemals selbst aufgrund von Zeitablauf ändern.

Kein:
- `nach X Tagen automatisch published`
- Scraping ohne ausdrückliche Projektentscheidung
- Vermutung anhand einer Suchmaschine

Der Status wird nur nach bestätigter Veröffentlichung durch eine bewusst gepflegte Konfigurationsänderung oder eine später ausdrücklich implementierte verlässliche Datenquelle geändert.

## 18. Abnahmekriterien V2

Zusätzlich zu den bisherigen Qualitätsprüfungen gilt:

- `/wissen-bewahren` funktioniert als dauerhafte Kampagnen-URL.
- Pending-Status entspricht dem tatsächlichen aktuellen Stand.
- Kein Mitzeichnen-CTA ist vor Veröffentlichung aktiv.
- Kampagnen-QR verweist auf `/wissen-bewahren`.
- Zielgruppenbereiche sind vorhanden.
- Pressebereich verwendet denselben zentralen Status.
- Materialbereich zeigt ausschließlich vorhandene Dateien.
- keine amtliche Gestaltung vortäuschen.
- keine Unterstützerzahlen erfinden.
- keine automatische Statusänderung.
- Published-Modus ist technisch vorbereitet und getestet.
- Änderung von Pending zu Published erfordert im Normalfall nur die zentrale Konfiguration.

## 19. Auftrag an Codex / Claude Code / Hermes

Setze die Kampagnenseite anhand dieser gesamten Spezifikation um. Die V2-Erweiterungen ergänzen die vorherigen Anforderungen und ersetzen sie nur dort, wo sie konkreter sind.

**Prioritäten:**

1. bestehende Website nicht beschädigen;
2. Kampagnenseite jetzt vollständig im Pending-Modus veröffentlichungsfähig machen;
3. sachliche, seriöse und nicht alarmistische Kommunikation;
4. dauerhafte Kampagnen-URL und zentrale Konfiguration;
5. Published-Modus vollständig vorbereiten, aber noch nicht öffentlich aktivieren;
6. responsive, barrierearme und performante Umsetzung;
7. vorhandene Kampagnenassets nur verwenden, wenn sie im Repository tatsächlich vorhanden sind;
8. keine Inhalte, Links, Zahlen oder Quellen erfinden.

Nach Umsetzung liefere eine kurze technische Zusammenfassung mit:
- angelegten/geänderten Dateien,
- Route,
- Speicherort der zentralen Konfiguration,
- aktuellem Statuswert,
- Vorgehen für den späteren Wechsel auf `published`,
- Build-/Lint-/Testergebnissen,
- noch offenen Punkten, die menschlich verifiziert werden müssen.
