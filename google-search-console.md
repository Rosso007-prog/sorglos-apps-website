# Google Search Console – Einrichtungsanleitung für sorglos-apps.de

## Schritt 1: Search Console öffnen

1. Gehe zu https://search.google.com/search-console
2. Mit Google-Konto anmelden (das Konto das du für die Domain-Verwaltung nutzt)

## Schritt 2: Domain hinzufügen

1. Klicke links oben auf das Property-Dropdown → „Property hinzufügen"
2. Wähle **„Domain"** (nicht URL-Präfix) → gibt volle Abdeckung für http/https und alle Subdomains
3. Gib ein: `sorglos-apps.de`
4. Klicke „Weiter"

## Schritt 3: DNS TXT Record setzen (empfohlen)

Google zeigt dir einen TXT Record wie:
```
google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Bei Cloudflare DNS:**
1. Cloudflare Dashboard → sorglos-apps.de → DNS → Records
2. „Record hinzufügen"
   - Type: `TXT`
   - Name: `@` (für die Root-Domain)
   - Content: `google-site-verification=DEIN-WERT`
   - TTL: Auto
3. Speichern
4. Warte 1–5 Minuten (Cloudflare propagiert sehr schnell)

## Schritt 4: Verifizierung abschließen

1. Zurück in der Search Console
2. Klicke „Bestätigen"
3. Google prüft den DNS-Record (kann bis zu 72h dauern, meist viel schneller)
4. Bei Erfolg: „Eigentumsrecht wurde bestätigt"

**Alternative: HTML-Datei (falls DNS nicht möglich)**
1. Google zeigt eine HTML-Datei zum Download (z.B. `google1abc2def.html`)
2. Datei ins Repo-Root legen (neben `index.html`)
3. Auf Cloudflare Pages deployen
4. Datei muss unter `https://sorglos-apps.de/google1abc2def.html` erreichbar sein
5. In Search Console auf „Bestätigen" klicken

## Schritt 5: Sitemap einreichen

1. Im Search Console Menü links: „Sitemaps"
2. Klicke „Neue Sitemap hinzufügen"
3. Gib ein: `sitemap.xml`
4. Klicke „Senden"
5. Sitemap-URL: `https://sorglos-apps.de/sitemap.xml`

Die Sitemap enthält 33+ URLs aller wichtigen Seiten.

## Nach der Einrichtung: Wichtige Berichte

| Bericht | Wo | Was prüfen |
|---|---|---|
| Abdeckung | Index → Seiten | Welche Seiten indexiert sind |
| Leistung | Suche → Ergebnisse | Klicks, Impressionen, CTR |
| Core Web Vitals | Erfahrung → Web Vitals | LCP, CLS, INP |
| Mobile Nutzbarkeit | Erfahrung → Mobilgeräte | Mobile Probleme |
| Strukturierte Daten | Verbesserungen | FAQPage, MobileApplication |

## Erwartete Indexierung

Folgende Seiten sollten innerhalb von 1–4 Wochen indexiert sein:

- `https://sorglos-apps.de/` (Startseite)
- `https://sorglos-apps.de/apps/grilltimer/`
- `https://sorglos-apps.de/apps/pro-doku/`
- `https://sorglos-apps.de/apps/baby-echo/`
- `https://sorglos-apps.de/apps/sortly-sorglos/`
- Alle 28 App-Detailseiten unter `/apps/*/`

## Hinweise

- **robots.txt** ist konfiguriert: `/admin/` und `/go/` sind ausgeschlossen
- **Canonical URLs** sind auf allen Seiten gesetzt
- **Strukturierte Daten** (MobileApplication, FAQPage, BreadcrumbList) sind auf allen App-Seiten aktiv
- Nach größeren Änderungen: URL-Prüftool in Search Console nutzen → „Indexierung beantragen"
