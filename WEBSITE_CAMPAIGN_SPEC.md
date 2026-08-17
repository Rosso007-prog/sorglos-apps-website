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
