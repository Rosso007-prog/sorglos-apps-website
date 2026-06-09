// Reads ?app=slug from URL, finds the matching entry in apps.json, renders the full detail page.
(function () {
    // Slug comes from data-slug on the script tag, or falls back to the folder name in the URL
    const scriptEl = document.currentScript
        || document.querySelector("script[data-slug]");
    const slug = (scriptEl && scriptEl.dataset.slug)
        || decodeURIComponent(window.location.pathname.split("/").filter(Boolean).slice(-2, -1)[0] || "");

    // Resolve path to apps.json: script is at ../Main/scripts/detail.js from app folder
    const scripts = document.querySelectorAll("script[src]");
    let base = "";
    scripts.forEach(s => {
        if (s.src.includes("detail.js")) {
            base = s.src.split("scripts/detail.js")[0] + "content/apps.json";
        }
    });

    if (!slug || !base) { showError("App nicht gefunden."); return; }

    fetch(base, { cache: "no-store" })
        .then(r => r.json())
        .then(data => {
            const app = data.apps.find(a => a.slug === slug);
            if (!app) { showError("Diese App existiert nicht."); return; }
            render(app, base);
        })
        .catch(() => showError("Inhalte konnten nicht geladen werden."));

    function render(app, base) {
        // Accent color
        document.body.style.setProperty("--accent", app.accent || "#6ee7c8");
        document.body.style.setProperty("--accent-2", shiftAccent(app.accent));

        // <title> & meta
        document.title = `${app.name} | Sorglos Apps`;
        const metaDesc = document.querySelector("meta[name='description']");
        if (metaDesc) metaDesc.setAttribute("content", app.description);

        // Prefer live App Store icon, fall back to local file
        // app.icon is relative to root (e.g. apps/Slug/AppIcon.png), page is at apps/Slug/
        const iconSrc = app.storeIcon
            || (app.icon && !app.icon.startsWith("http") ? `../../${app.icon}` : app.icon)
            || "";

        // Datenschutz path
        const datenschutzHref = `Datenschutz/Datenschutz.html`;

        const goSlug = (app.slug || "").toLowerCase().replace(/_/g, "-");
        const storeBtn = app.appStoreUrl
            ? `<a class="button button-primary" href="/go/${encodeURIComponent(goSlug)}" target="_blank" rel="noopener">Im App Store</a>`
            : `<span class="button button-primary button-disabled">Demnächst verfügbar</span>`;

        // Features
        const featureCards = (app.features || []).map(f => `
            <article class="feature-card">
                <h3>${f.titel}</h3>
                <p>${f.text}</p>
            </article>
        `).join("");

        // Screenshots — from App Store API (screenshotUrls) or local files (screenshots[])
        const screenshots = app.screenshotUrls && app.screenshotUrls.length
            ? app.screenshotUrls
            : (app.screenshots || []).map(f => `screenshots/${f}`);

        // Pills / badges
        const pills = (app.badges || []).map(b => `<span class="pill">${b}</span>`).join("");

        document.getElementById("detail-root").innerHTML = `
            <section class="hero">
                <div class="hero-copy">
                    <p class="eyebrow">${app.category} · ${app.audience}</p>
                    <h1>${app.name}</h1>
                    <p class="lead">${app.storeDescription || app.description}</p>
                    <div class="hero-actions">
                        ${storeBtn}
                        <a class="button button-secondary" href="../Support/index.html">Support</a>
                    </div>
                </div>
                <div class="hero-card">
                    <div class="hero-card-head">
                        ${iconSrc ? `<img class="app-icon" src="${iconSrc}" alt="${app.name} Icon">` : `<div class="app-icon-placeholder"></div>`}
                        <div>
                            <strong>${app.name}</strong>
                            <span>${app.tagline}</span>
                        </div>
                    </div>
                    <div class="pills">${pills}</div>
                </div>
            </section>

            ${featureCards ? `
            <section class="section">
                <div class="section-intro">
                    <p class="eyebrow">Features</p>
                    <h2>Was die App kann.</h2>
                </div>
                <div class="feature-grid">${featureCards}</div>
            </section>` : ""}

            ${screenshots.length ? `
            <section class="section">
                <div class="section-intro">
                    <p class="eyebrow">Screenshots</p>
                    <h2>Die App in Aktion.</h2>
                </div>
                <div class="screenshot-scroll">
                    ${screenshots.map(url => `
                        <div class="screenshot-frame">
                            <img src="${url}" alt="${app.name} Screenshot" loading="lazy">
                        </div>
                    `).join("")}
                </div>
            </section>` : ""}

            <section class="cta-panel">
                <div>
                    <p class="eyebrow">Jetzt testen</p>
                    <h2>Bereit zum Download?</h2>
                    <p>${app.tagline}</p>
                </div>
                <div class="button-row">
                    ${storeBtn}
                    <a class="button button-secondary" href="${datenschutzHref}">Datenschutz</a>
                </div>
            </section>
        `;

        // Init lightbox and drag-scroll after HTML is rendered
        if (screenshots.length) {
            initLightbox(screenshots);
            initDragScroll(document.querySelector(".screenshot-scroll"));
        }
    }

    function initDragScroll(el) {
        if (!el) return;
        let isDown = false, startX = 0, scrollLeft = 0, moved = false;

        el.addEventListener("mousedown", e => {
            isDown = true;
            moved = false;
            startX = e.pageX - el.offsetLeft;
            scrollLeft = el.scrollLeft;
        });
        el.addEventListener("mouseleave", () => isDown = false);
        el.addEventListener("mouseup", () => isDown = false);
        el.addEventListener("mousemove", e => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            if (Math.abs(x - startX) > 5) moved = true;
            el.scrollLeft = scrollLeft - (x - startX) * 1.5;
        });
        // Block click-to-open if user was dragging
        el.addEventListener("click", e => {
            if (moved) e.stopPropagation();
        }, true);
    }

    function initLightbox(urls) {
        let current = 0;

        // Inject lightbox shell once
        const lb = document.createElement("div");
        lb.className = "lightbox";
        lb.innerHTML = `
            <img class="lightbox-img" src="" alt="">
            <button class="lightbox-close" aria-label="Schließen">✕</button>
            ${urls.length > 1 ? `
            <button class="lightbox-prev" aria-label="Vorheriges">‹</button>
            <button class="lightbox-next" aria-label="Nächstes">›</button>
            <span class="lightbox-counter"></span>` : ""}
        `;
        document.body.appendChild(lb);

        const img     = lb.querySelector(".lightbox-img");
        const counter = lb.querySelector(".lightbox-counter");

        function show(index) {
            current = (index + urls.length) % urls.length;
            img.src = urls[current];
            if (counter) counter.textContent = `${current + 1} / ${urls.length}`;
        }

        function open(index) {
            show(index);
            lb.classList.add("is-open");
            document.body.style.overflow = "hidden";
        }

        function close() {
            lb.classList.remove("is-open");
            document.body.style.overflow = "";
        }

        // Click on screenshot frame opens lightbox
        document.querySelectorAll(".screenshot-frame").forEach((frame, i) => {
            frame.addEventListener("click", () => open(i));
        });

        lb.querySelector(".lightbox-close").addEventListener("click", close);
        lb.querySelector(".lightbox-prev")?.addEventListener("click", () => show(current - 1));
        lb.querySelector(".lightbox-next")?.addEventListener("click", () => show(current + 1));

        // Click outside image closes
        lb.addEventListener("click", e => { if (e.target === lb) close(); });

        // Keyboard navigation
        document.addEventListener("keydown", e => {
            if (!lb.classList.contains("is-open")) return;
            if (e.key === "Escape")      close();
            if (e.key === "ArrowLeft")   show(current - 1);
            if (e.key === "ArrowRight")  show(current + 1);
        });
    }

    function showError(msg) {
        document.getElementById("detail-root").innerHTML =
            `<section class="section"><p style="color:var(--muted)">${msg}</p></section>`;
    }

    // Anonymous page view tracking
    try {
        fetch("/api/track-pageview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ page: window.location.pathname }),
            keepalive: true,
        }).catch(() => {});
    } catch (_) {}

    // Shift hue slightly for accent-2
    function shiftAccent(hex) {
        if (!hex) return "#7dafff";
        const presets = {
            "#6ee7c8": "#7dafff", "#ffd166": "#ffb86b", "#7dafff": "#a0c4ff",
            "#9be36f": "#7ee081", "#69d5ff": "#7dafff", "#ff8ec9": "#f59bb4",
            "#ffb86b": "#ffd166", "#62dfff": "#7dafff", "#8fe36b": "#9be36f",
            "#f7a4e8": "#ff8ec9", "#ffbf73": "#ffcb7d", "#ffcb7d": "#ff9e6d",
            "#8ab5ff": "#7dafff", "#f59bb4": "#ff8ec9", "#76c9ff": "#6ecfff",
            "#c4a0ff": "#8ab5ff", "#ff9e6d": "#ffb86b", "#ffb0a6": "#ff8ec9",
            "#b0e6c0": "#9be36f", "#a0e878": "#8fe36b", "#b4f0a0": "#9be36f",
            "#b8d4ff": "#7dafff", "#a0c4ff": "#7dafff", "#6ecfff": "#7dafff",
        };
        return presets[hex] || "#7dafff";
    }
})();
