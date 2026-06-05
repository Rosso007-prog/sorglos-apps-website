#!/usr/bin/env node
// Scans apps/*/screenshots/ for image files and writes the filenames
// into apps.json (field: "screenshots"). Runs automatically on debug start.

const fs   = require("fs");
const path = require("path");

const ROOT      = path.join(__dirname, "../../");
const APPS_DIR  = path.join(ROOT, "apps");
const JSON_PATH = path.join(ROOT, "Main/content/apps.json");
const IMG_EXT   = /\.(png|jpg|jpeg|webp)$/i;

const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
let changed = 0;

data.apps.forEach(app => {
    const screenshotsDir = path.join(APPS_DIR, app.slug, "screenshots");

    if (!fs.existsSync(screenshotsDir)) {
        // No folder → clear stale entries
        if (app.screenshots && app.screenshots.length) {
            app.screenshots = [];
            changed++;
        }
        return;
    }

    const files = fs.readdirSync(screenshotsDir)
        .filter(f => IMG_EXT.test(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const before = JSON.stringify(app.screenshots || []);
    const after  = JSON.stringify(files);

    if (before !== after) {
        app.screenshots = files;
        changed++;
        console.log(`📸  ${app.name}: ${files.length} Screenshot(s) → ${files.join(", ")}`);
    }
});

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + "\n");

if (changed === 0) {
    console.log("📸  Screenshots: keine Änderungen.");
} else {
    console.log(`📸  ${changed} App(s) aktualisiert.`);
}
