export const APP_LINKS = {
  "grilltimer": "https://apps.apple.com/de/app/my-grill-timer-sorglos/id6670444680",
  "my-grill-timer": "https://apps.apple.com/de/app/my-grill-timer-sorglos/id6670444680",
  "pro-doku": "https://apps.apple.com/de/app/baudokumentation-pro-doku/id6754005836",
  "baudokumentation": "https://apps.apple.com/de/app/baudokumentation-pro-doku/id6754005836",
  "baby-echo": null, // TODO: App Store link fehlt – sobald verfügbar ergänzen
  "babysorglos": null, // TODO: App Store link fehlt – sobald verfügbar ergänzen
  "sortly-sorglos": "https://apps.apple.com/de/app/sortly-sorglos/id6738582535",
  "sortly": "https://apps.apple.com/de/app/sortly-sorglos/id6738582535",
  "retro-pulse": null, // TODO: App Store link fehlt – sobald verfügbar ergänzen
  "retropulse": null, // TODO: App Store link fehlt – sobald verfügbar ergänzen
  "neurobyte": "https://apps.apple.com/de/app/neurobyte-wissen-vs-ki/id6744259967",
  "eieruhr-pro": "https://apps.apple.com/de/app/eieruhr-pro-sorglos/id6670164294",
  "eieruhr": "https://apps.apple.com/de/app/eieruhr-pro-sorglos/id6670164294",
  "gravity-gloop": "https://apps.apple.com/de/app/gravity-gloop/id6747406516",
  "buchhaltung": "https://apps.apple.com/de/app/buchhaltung-sorglos/id6737428527",
  "buchhaltung-sorglos": "https://apps.apple.com/de/app/buchhaltung-sorglos/id6737428527",
  "abosorglos": "https://apps.apple.com/de/app/abosorglos/id6760611316",
  "abo-sorglos": "https://apps.apple.com/de/app/abosorglos/id6760611316",
  "passsafe": "https://apps.apple.com/de/app/passsafe-sorglos/id6759046653",
  "passsafe-sorglos": "https://apps.apple.com/de/app/passsafe-sorglos/id6759046653",
  "imad-zipi": "https://apps.apple.com/de/app/imad-zipi/id6753635794",
  "sorglos-wachsen": "https://apps.apple.com/de/app/sorglos-wachsen/id6739536384",
  "routine-coach": "https://apps.apple.com/de/app/routine-coach/id6749523878",
  "growmie": "https://apps.apple.com/de/app/growmie-sorglos/id6747469986",
  "growmie-sorglos": "https://apps.apple.com/de/app/growmie-sorglos/id6747469986",
  "speedtest": "https://apps.apple.com/de/app/speed-test-sorglos/id6739985969",
  "speedtest-sorglos": "https://apps.apple.com/de/app/speed-test-sorglos/id6739985969",
  "fotosafe": "https://apps.apple.com/de/app/fotosafe-sorglos/id6740139435",
  "fotosafe-sorglos": "https://apps.apple.com/de/app/fotosafe-sorglos/id6740139435",
  "herzensworte": "https://apps.apple.com/de/app/herzensworte/id6751487677",
  "ideaspark": "https://apps.apple.com/de/app/ideaspark-one-idea-a-day/id6743702294",
  "gedaechtnisprofi": "https://apps.apple.com/de/app/ged%C3%A4chtnis-profi/id6740916047",
  "gedachtnis-profi": "https://apps.apple.com/de/app/ged%C3%A4chtnis-profi/id6740916047",
  "mein-einhorn": "https://apps.apple.com/de/app/mein-einhorn/id6739771279",
  "malbuch": "https://apps.apple.com/de/app/mein-malbuch-sorglos/id6706979484",
  "mein-malbuch": "https://apps.apple.com/de/app/mein-malbuch-sorglos/id6706979484",
  "anything2erp": "https://apps.apple.com/de/app/anything2erp/id6740336978",
  "leafy": null, // TODO: App Store link fehlt – sobald verfügbar ergänzen
  "growzilla": null, // TODO: App Store link fehlt – sobald verfügbar ergänzen
  "colormood": null, // TODO: App Store link fehlt – sobald verfügbar ergänzen
  "schwangerschaft": null, // TODO: App Store link fehlt – sobald verfügbar ergänzen
  "recycling": null, // TODO: App Store link fehlt – sobald verfügbar ergänzen
};

export function resolveAppLink(key) {
  const k = key.toLowerCase();
  if (!(k in APP_LINKS)) return undefined; // unknown app → 404
  return APP_LINKS[k];                     // null → "coming soon", string → redirect
}
