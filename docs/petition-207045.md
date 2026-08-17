# Kampagnenseite Petition 207045

Die statische Kampagnenseite liegt unter `wissen-bewahren/` und ist unter
`https://sorglos-apps.de/wissen-bewahren/` erreichbar.

## Petitionsstatus ändern

Alle veränderlichen Petitionsdaten stehen zentral in `wissen-bewahren/config.js`.
Im Ausgangszustand ist die Petition auf `pending` gesetzt; die CTA-Elemente sind
dann nicht verlinkt.

Nach der Veröffentlichung:

1. `petitionStatus` auf `published` setzen.
2. `officialPetitionUrl` ausschließlich auf die verifizierte offizielle URL der Petitionsplattform des Deutschen Bundestages setzen.
3. `lastVerifiedAt` aktualisieren.
4. Optional `deadline` und `currentSignatures` nur mit verlässlich gepflegten Daten ergänzen.

Bei `published` ohne gültige `officialPetitionUrl` rendert das Skript keinen
Mitzeichnen-Link und gibt einen Fehler in der Browser-Konsole aus. Statusblock,
Pressebereich, CTAs und Share-Text werden aus derselben Konfiguration abgeleitet.
Eine eigene Mitzeichnungsfunktion oder Datenbank gibt es nicht.

Die dauerhafte Kampagnen- und Share-URL ist
`https://sorglos-apps.de/wissen-bewahren`. Der technisch erzeugte QR-Code unter
`wissen-bewahren/petition-207045-kampagnen-qr.png` kodiert ebenfalls diese URL.

## Dateien

- `index.html`: Inhalt, SEO, FAQ, Quellen und Pressebereich
- `styles.css`: responsives, eigenständiges Kampagnendesign
- `v2.css`: ergänzende V2-Komponenten für Status, Zielgruppen und Material
- `config.js`: zentrale Statuskonfiguration
- `campaign.js`: CTA-Status und Teilen/Kopieren
- `og-image.svg`: lokale Open-Graph-Grafik
- `petition-207045-kampagnen-qr.png`: allgemeiner, dauerhafter Kampagnen-QR

Die Quellen wurden zuletzt am 17. August 2026 geprüft. Vor wesentlichen
inhaltlichen Änderungen und insbesondere vor dem Wechsel zu `published` sollten
Status, offizieller Link und Quellen erneut verifiziert werden.
