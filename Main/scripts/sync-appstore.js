#!/usr/bin/env node
// Fetches current icons, descriptions and screenshots from the iTunes Search API
// and updates Main/content/apps.json in place.
//
// Usage:
//   node Main/scripts/sync-appstore.js          → prüft ob 24h vergangen sind
//   node Main/scripts/sync-appstore.js --force  → erzwingt Sync unabhängig vom Timestamp

const fs = require("fs");
const https = require("https");
const path = require("path");

const JSON_PATH    = path.join(__dirname, "../content/apps.json");
const STAMP_PATH   = path.join(__dirname, "../content/sync-timestamp.json");
const COUNTRY      = "de";
const DELAY_MS     = 400;
const MIN_INTERVAL = 24 * 60 * 60 * 1000; // 24 Stunden in ms

const force = process.argv.includes("--force");

// ── Timestamp-Check ──────────────────────────────────────
function getLastSync() {
    try {
        return JSON.parse(fs.readFileSync(STAMP_PATH, "utf8")).lastSync || 0;
    } catch { return 0; }
}

function saveTimestamp() {
    fs.writeFileSync(STAMP_PATH, JSON.stringify({
        lastSync: Date.now(),
        lastSyncHuman: new Date().toLocaleString("de-DE")
    }, null, 2) + "\n");
}

function hoursAgo(ms) {
    return ((Date.now() - ms) / 1000 / 60 / 60).toFixed(1);
}

// ── HTTP helper ───────────────────────────────────────────
function get(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let body = "";
            res.on("data", d => body += d);
            res.on("end", () => {
                try { resolve(JSON.parse(body)); }
                catch (e) { reject(new Error("Ungültige API-Antwort")); }
            });
        }).on("error", reject);
    });
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function extractId(appStoreUrl) {
    const m = (appStoreUrl || "").match(/id(\d+)/);
    return m ? m[1] : null;
}

function shortenDescription(text) {
    if (!text || text.length <= 300) return text;
    const cut = text.substring(0, 300);
    const lastDot = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(".\n"));
    return lastDot > 150 ? cut.substring(0, lastDot + 1) : cut.trimEnd() + "…";
}

// ── Main ──────────────────────────────────────────────────
async function sync() {
    const lastSync = getLastSync();
    const elapsed  = Date.now() - lastSync;

    if (!force && lastSync && elapsed < MIN_INTERVAL) {
        const remaining = ((MIN_INTERVAL - elapsed) / 1000 / 60).toFixed(0);
        console.log(`⏱  Letzter Sync vor ${hoursAgo(lastSync)}h — warte noch ${remaining} Minuten.`);
        console.log(`   Erzwingen mit: node Main/scripts/sync-appstore.js --force`);
        process.exit(0);
    }

    if (lastSync) {
        console.log(`🔄  Letzter Sync vor ${hoursAgo(lastSync)}h — starte Aktualisierung…\n`);
    } else {
        console.log("🔄  Erster Sync — hole alle App Store Daten…\n");
    }

    const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
    let updated = 0, skipped = 0, errors = 0;

    for (const app of data.apps) {
        const id = extractId(app.appStoreUrl);
        if (!id) {
            console.log(`⏭  ${app.name} — keine App Store ID`);
            skipped++;
            continue;
        }

        try {
            const url    = `https://itunes.apple.com/lookup?id=${id}&country=${COUNTRY}&entity=software`;
            const result = await get(url);
            const info   = result.results && result.results[0];

            if (!info) {
                console.log(`⚠️  ${app.name} — kein API-Ergebnis`);
                skipped++;
                continue;
            }

            let changed = false;

            // Icon
            const iconUrl = (info.artworkUrl512 || info.artworkUrl100 || "")
                .replace("100x100bb", "512x512bb")
                .replace("60x60bb", "512x512bb");
            if (iconUrl && app.storeIcon !== iconUrl) {
                app.storeIcon = iconUrl;
                changed = true;
            }

            // Beschreibung
            const desc = shortenDescription(info.description);
            if (desc && app.storeDescription !== desc) {
                app.storeDescription = desc;
                changed = true;
            }

            // Screenshots
            const shots = (info.screenshotUrls && info.screenshotUrls.length)
                ? info.screenshotUrls
                : (info.ipadScreenshotUrls || []);
            if (JSON.stringify(shots) !== JSON.stringify(app.screenshotUrls || [])) {
                app.screenshotUrls = shots;
                changed = true;
            }

            if (changed) {
                console.log(`✅  ${app.name} — aktualisiert`);
                updated++;
            } else {
                console.log(`✓  ${app.name} — unverändert`);
            }

        } catch (err) {
            console.log(`❌  ${app.name} — Fehler: ${err.message}`);
            errors++;
        }

        await sleep(DELAY_MS);
    }

    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + "\n");
    saveTimestamp();

    console.log(`\n✔  Fertig: ${updated} aktualisiert · ${skipped} ohne ID · ${errors} Fehler`);
    console.log(`   Nächster Sync frühestens in 24h möglich.`);
}

sync();
