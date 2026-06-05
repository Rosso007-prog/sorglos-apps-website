# Sorglos Apps – Projektstruktur

## Ordnerübersicht

```
sorglos-apps-website/
├── index.html                  # Startseite
├── Main/
│   ├── styles/
│   │   ├── home.css            # Styling nur für index.html
│   │   └── app-pages.css       # Shared CSS für alle App-Seiten & Support
│   ├── scripts/
│   │   └── home.js             # Portfolio-Rendering, Filter, Spotlight
│   ├── content/
│   │   └── apps.json           # Zentrale App-Datenquelle (single source of truth)
│   └── Datenschutz1.html       # Globale Datenschutzerklärung
├── <AppName>/                  # Pro App ein Ordner, z.B. Anything2ERP/
│   ├── index.html              # App-Landingpage
│   ├── AppIcon150x150.png      # App-Icon (wird im Portfolio-Grid verwendet)
│   ├── Datenschutz/
│   │   └── Datenschutz.html    # App-spezifische Datenschutzseite
│   └── Data/                   # App-Inhalte (JSON, Bilder, Sprachdateien)
├── Support/
│   └── index.html              # Zentrale Support-Seite (App-Select dynamisch)
├── .vscode/
│   ├── launch.json             # Debug: startet Chrome + lokaler Server
│   └── tasks.json              # Pre-launch Task: Server neu starten
├── docs/
│   └── PROJECT_STRUCTURE.md    # Diese Datei
├── .gitignore
├── .nojekyll                   # Für GitHub Pages (kein Jekyll-Processing)
├── LokalTesten.command         # Lokalen Server starten (macOS)
└── StopLokalTesten.command     # Lokalen Server stoppen (macOS)
```

## Shared Ressourcen

| Datei | Verwendet von |
|-------|--------------|
| `Main/styles/home.css` | `index.html` |
| `Main/styles/app-pages.css` | Alle App-`index.html`, alle `Datenschutz/Datenschutz.html`, `Support/index.html` |
| `Main/scripts/home.js` | `index.html` |
| `Main/content/apps.json` | `index.html` (Portfolio-Grid), `Support/index.html` (App-Select) |

## CSS-Einbindung

App-Landingpage (`AppName/index.html`):
```html
<link rel="stylesheet" href="../Main/styles/app-pages.css">
```

Datenschutzseite (`AppName/Datenschutz/Datenschutz.html`):
```html
<link rel="stylesheet" href="../../Main/styles/app-pages.css">
```

## Neue App hinzufügen

1. Ordner `<AppName>/` anlegen mit `index.html`, `AppIcon150x150.png`, `Datenschutz/Datenschutz.html`
2. Eintrag in `Main/content/apps.json` hinzufügen
3. Fertig – Portfolio-Grid und Support-Select aktualisieren sich automatisch

## Lokales Testen

- **VS Code ▶:** Startet Chrome automatisch, cache-frei, auf `http://localhost:8000`
- **LokalTesten.command:** Doppelklicken → öffnet `http://localhost:8000` im Standardbrowser

## Hosting

GitHub Pages – Branch `main`, Root-Ordner.
`.nojekyll` sorgt dafür dass Ordner mit Underscore korrekt ausgeliefert werden.
