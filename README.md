# Sorglos Apps Website

Statische Portfolio-Website für die Sorglos Apps.

## Lokal testen

Im Projektordner liegen zwei anklickbare Dateien:

- `LokalTesten.command`
- `StopLokalTesten.command`

Mit `LokalTesten.command` startest du einen lokalen Testserver auf `http://localhost:8000`.

## VS Code Debuggen

Für VS Code ist eine Startkonfiguration vorhanden:

- `.vscode/launch.json`

So startest du die Website direkt über VS Code:

1. Projekt in VS Code öffnen
2. Links auf `Run and Debug`
3. `Website lokal testen` auswählen
4. Auf `Debuggen starten` klicken

VS Code startet dann automatisch einen lokalen Server auf `http://localhost:8000` und öffnet die Website im Browser.
Wenn du das Debugging stoppst, wird auch der Testserver beendet.

## GitHub Pages

Dieses Repository ist für statisches Hosting vorbereitet.

Wichtig:

- Die Datei `.nojekyll` ist vorhanden, damit GitHub Pages auch Verzeichnisse mit `_` korrekt ausliefert.
- Die Website startet über `index.html` im Root-Verzeichnis.
- Alle App-Seiten und Datenschutzseiten sind relativ verlinkt und für statisches Hosting aufgebaut.

## Cloudflare Pages

Für Cloudflare Pages kannst du das Repository direkt mit GitHub verbinden.

Empfohlene Einstellungen:

- `Production branch`: `main`
- `Build command`: `exit 0`
- `Build output directory`: `.`

## Struktur

- `index.html` zentrale Startseite mit datengetriebenem Portfolio
- `Main/content/apps.json` zentrale App-Daten für die Startseite
- `Main/styles/home.css` Styling der Startseite
- `Main/styles/app-pages.css` gemeinsames Styling für Unterseiten
- `Main/scripts/home.js` Navigation, Filter und Portfolio-Rendering
- `Support/` zentrale Support-Seite
- `Main/Datenschutz1.html` globale Datenschutzerklärung
- `*/index.html` App-Landingpages
- `*/Datenschutz/Datenschutz.html` app-spezifische Datenschutzerklärungen
- `docs/PROJECT_STRUCTURE.md` kurze Architekturübersicht
