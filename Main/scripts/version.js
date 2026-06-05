// Finds version.json relative to Main/scripts/ regardless of nesting depth
(function () {
    const scripts = document.querySelectorAll("script[src]");
    let base = "";
    scripts.forEach(s => {
        if (s.src.includes("version.js")) {
            base = s.src.replace("scripts/version.js", "content/version.json");
        }
    });
    if (!base) return;

    fetch(base)
        .then(r => r.json())
        .then(({ version, built }) => {
            document.querySelectorAll(".footer-version").forEach(el => {
                el.textContent = `v${version}`;
                el.title = `Stand: ${built}`;
            });
        })
        .catch(() => {});
})();
