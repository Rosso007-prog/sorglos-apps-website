# Sorglos Apps Website

Statische Portfolio-Website für die Sorglos Apps.

## Lokal testen

Im Projektordner liegen zwei anklickbare Dateien:

- `LokalTesten.command`
- `StopLokalTesten.command`

Mit `LokalTesten.command` startest du einen lokalen Testserver auf `http://localhost:8000`.

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

- `index.html` zentrale Startseite
- `Support/` Support-Seite
- `Main/Datenschutz1.html` globale Datenschutzerklärung
- `*/index.html` App-Landingpages
- `*/Datenschutz/Datenschutz.html` app-spezifische Datenschutzerklärungen
