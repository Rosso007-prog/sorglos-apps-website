const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const spotlightRoot = document.querySelector("#featured-spotlight");
const categoryRoot = document.querySelector("#category-grid");
const gridRoot = document.querySelector("#app-grid");
const filterRoot = document.querySelector("#filter-bar");

const accentMap = {
    Business: "rgba(138, 182, 255, 0.2)",
    Familie: "rgba(143, 244, 200, 0.2)",
    Lifestyle: "rgba(255, 199, 133, 0.2)",
    Mind: "rgba(194, 166, 255, 0.2)",
    Play: "rgba(255, 129, 150, 0.2)"
};

function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
}

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(link => {
        // click + touchend für iOS
        link.addEventListener("click", closeMenu);
        link.addEventListener("touchend", closeMenu, { passive: true });
    });

    document.addEventListener("click", e => {
        if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) {
            closeMenu();
        }
    });
    document.addEventListener("touchend", e => {
        if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) {
            closeMenu();
        }
    }, { passive: true });
}

const setMetrics = (apps) => {
    const featured = apps.filter((app) => app.featured);
    const categories = [...new Set(apps.map((app) => app.category))];

    const appMetric = document.querySelector("#metric-apps");
    const categoryMetric = document.querySelector("#metric-categories");
    const featuredMetric = document.querySelector("#metric-featured");

    if (appMetric) appMetric.textContent = String(apps.length);
    if (categoryMetric) categoryMetric.textContent = String(categories.length);
    if (featuredMetric) featuredMetric.textContent = String(featured.length);
};

const shuffle = (arr) => arr
    .map(a => ({ a, r: Math.random() }))
    .sort((x, y) => x.r - y.r)
    .map(x => x.a);

const pickFeatured = (apps) => {
    // One random app per category, then fill up with remaining featured
    const featured = shuffle(apps.filter(a => a.featured));
    const picked = [];
    const usedCategories = new Set();
    for (const app of featured) {
        if (!usedCategories.has(app.category)) {
            picked.push(app);
            usedCategories.add(app.category);
        }
        if (picked.length === 4) break;
    }
    // Fill remaining slots if fewer than 4 categories
    if (picked.length < 4) {
        for (const app of featured) {
            if (!picked.includes(app)) picked.push(app);
            if (picked.length === 4) break;
        }
    }
    return picked;
};

// Convert a slug to a /go/ tracking URL. Falls back to detail page if no store link.
const goLink = (app) => {
    if (app.appStoreUrl) return `/go/${encodeURIComponent(app.slug.toLowerCase().replace(/_/g, "-"))}`;
    if (app.href && !app.href.startsWith("http")) return app.href;
    return "#";
};

const renderFeatured = (apps) => {
    if (!spotlightRoot) return;

    const featured = pickFeatured(apps);
    spotlightRoot.innerHTML = featured.map((app) => {
        const href = goLink(app);
        const target = app.appStoreUrl ? ' target="_blank" rel="noopener"' : "";
        return `
        <a class="spotlight-card" href="${href}"${target} style="--spotlight-glow:${app.accent || accentMap[app.category] || "rgba(143, 244, 200, 0.18)"};">
            <span class="spotlight-chip">${app.category}</span>
            <h3>${app.name}</h3>
            <p>${app.tagline}</p>
            <strong>${app.audience}</strong>
        </a>
        `;
    }).join("");
};

const categoryOrder = ["Business", "Familie", "Lifestyle", "Mind", "Play"];

const renderCategories = (apps) => {
    if (!categoryRoot) return;

    const categories = categoryOrder.filter((category) => apps.some((app) => app.category === category));
    const copy = {
        Business: "Struktur, Produktivität und Tools für echte Arbeitsabläufe.",
        Familie: "Begleiter für Eltern, Kinder und entspanntere Routinen.",
        Lifestyle: "Praktische Helfer für Alltag, Ordnung und persönliche Gewohnheiten.",
        Mind: "Ideen, Sprache, Emotion und Fokus in digitaler Form.",
        Play: "Spielerische Welten, Farbe, Motivation und kreative Energie."
    };

    categoryRoot.innerHTML = categories.map((category) => {
        const count = apps.filter((app) => app.category === category).length;
        return `
            <article class="category-card" style="--category-glow:${accentMap[category] || "rgba(143, 244, 200, 0.18)"};">
                <span class="category-badge">${category}</span>
                <h3>${category === "Mind" ? "Ideen & Fokus" : category}</h3>
                <p>${copy[category] || "Ein klarer Themenbereich innerhalb des Sorglos-Portfolios."}</p>
                <strong>${count}</strong>
            </article>
        `;
    }).join("");
};

const renderFilters = (apps, onFilterChange) => {
    if (!filterRoot) return;

    const categories = ["Alle", ...categoryOrder.filter((category) => apps.some((app) => app.category === category))];
    filterRoot.innerHTML = categories.map((category, index) => `
        <button class="filter-button${index === 0 ? " is-active" : ""}" type="button" data-filter="${category}">
            ${category}
        </button>
    `).join("");

    filterRoot.querySelectorAll(".filter-button").forEach((button) => {
        button.addEventListener("click", () => {
            filterRoot.querySelectorAll(".filter-button").forEach((entry) => entry.classList.remove("is-active"));
            button.classList.add("is-active");
            onFilterChange(button.dataset.filter || "Alle");
        });
    });
};

const getAppIcon = (app) => {
    if (app.storeIcon) return app.storeIcon;
    if (app.icon && !app.icon.startsWith("http")) return app.icon;
    return app.icon || "";
};

const createAppCard = (app) => {
    const hasLandingPage = app.href && !app.href.startsWith("http");
    const landingHref = hasLandingPage ? app.href : null;
    const storeHref = app.appStoreUrl || null;
    const trackingHref = storeHref ? goLink(app) : null;
    const iconSrc = getAppIcon(app);

    return `
    <article class="app-card">
        <div class="app-card-shell">
            <div class="app-card-top">
                ${iconSrc ? `<img class="app-icon" src="${iconSrc}" alt="${app.name} Icon" loading="lazy">` : `<div class="app-icon-placeholder"></div>`}
                <div class="app-card-copy">
                    <div class="app-card-name-row">
                        <strong class="app-card-name">${app.name}</strong>
                        ${!storeHref ? `<span class="app-wip-badge">In Entwicklung</span>` : ""}
                    </div>
                    <span class="app-tagline">${app.tagline}</span>
                </div>
            </div>
            <div class="app-card-actions">
                ${landingHref ? `<a href="${landingHref}">Details</a>` : ""}
                ${trackingHref ? `<a href="${trackingHref}" target="_blank" rel="noopener">App Store</a>` : ""}
                ${!landingHref && !storeHref ? `<span class="app-coming-soon">Demnächst</span>` : ""}
            </div>
        </div>
    </article>
    `;
};

const renderApps = (apps, activeFilter = "Alle") => {
    if (!gridRoot) return;

    const filteredApps = activeFilter === "Alle"
        ? apps
        : apps.filter((app) => app.category === activeFilter);

    gridRoot.innerHTML = filteredApps.map(createAppCard).join("");
};

const initPortfolio = async () => {
    try {
        const response = await fetch("Main/content/apps.json", { cache: "no-store" });
        if (!response.ok) throw new Error("Portfolio konnte nicht geladen werden.");

        const data = await response.json();
        const apps = (Array.isArray(data.apps) ? data.apps : [])
            .sort((a, b) => (b.appStoreUrl ? 1 : 0) - (a.appStoreUrl ? 1 : 0));

        setMetrics(apps);
        renderFeatured(apps);
        renderCategories(apps);
        renderApps(apps);
        renderFilters(apps, (filter) => renderApps(apps, filter));
    } catch (error) {
        if (spotlightRoot) {
            spotlightRoot.innerHTML = `
                <article class="spotlight-card">
                    <span class="spotlight-chip">Hinweis</span>
                    <h3>Portfolio konnte nicht geladen werden</h3>
                    <p>Bitte teste die Seite über den lokalen Webserver oder direkt über GitHub beziehungsweise Cloudflare Pages.</p>
                </article>
            `;
        }

        if (categoryRoot) {
            categoryRoot.innerHTML = "";
        }

        if (gridRoot) {
            gridRoot.innerHTML = `
                <article class="app-card">
                    <div class="app-card-shell">
                        <div class="app-card-copy">
                            <span class="app-chip">Fehler</span>
                            <h3>Die App-Daten konnten nicht geladen werden.</h3>
                            <p>Wenn du lokal testest, starte die Website bitte über LokalTesten.command oder den VS-Code-Debug-Server.</p>
                        </div>
                    </div>
                </article>
            `;
        }
    }
};

initPortfolio();

// Anonymous page view tracking – no cookies, no personal data
(function trackPageView() {
    try {
        fetch("/api/track-pageview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ page: window.location.pathname }),
            keepalive: true,
        }).catch(() => {});
    } catch (_) {}
})();
