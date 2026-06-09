import { initializeDatabase } from "../lib/db.js";
import { verifySessionCookie, isValidSession } from "../lib/session.js";

async function requireAuth(request, env) {
  const SESSION_SECRET = env.SESSION_SECRET || "";
  const token = await verifySessionCookie(request, SESSION_SECRET);
  if (!token) return false;
  if (!env.DB) return false;
  return await isValidSession(env.DB, token);
}

export async function onRequestGet(context) {
  const { request, env } = context;

  const authenticated = await requireAuth(request, env);
  if (!authenticated) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const db = env.DB;
  await initializeDatabase(db);

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const day7 = new Date(now.getTime() - 7 * 24 * 3600 * 1000).toISOString();
  const day30 = new Date(now.getTime() - 30 * 24 * 3600 * 1000).toISOString();

  const [
    clicksTotal,
    clicksToday,
    clicks7d,
    clicks30d,
    viewsTotal,
    viewsToday,
    views7d,
    views30d,
    topApps,
    topCountriesClicks,
    topPages,
    recentClicks,
    recentViews,
    clicksPerDay,
    viewsPerDay,
  ] = await Promise.all([
    db.prepare("SELECT COUNT(*) as n FROM app_clicks").first(),
    db.prepare("SELECT COUNT(*) as n FROM app_clicks WHERE clicked_at >= ?").bind(todayStr).first(),
    db.prepare("SELECT COUNT(*) as n FROM app_clicks WHERE clicked_at >= ?").bind(day7).first(),
    db.prepare("SELECT COUNT(*) as n FROM app_clicks WHERE clicked_at >= ?").bind(day30).first(),

    db.prepare("SELECT COUNT(*) as n FROM page_views").first(),
    db.prepare("SELECT COUNT(*) as n FROM page_views WHERE viewed_at >= ?").bind(todayStr).first(),
    db.prepare("SELECT COUNT(*) as n FROM page_views WHERE viewed_at >= ?").bind(day7).first(),
    db.prepare("SELECT COUNT(*) as n FROM page_views WHERE viewed_at >= ?").bind(day30).first(),

    db.prepare("SELECT app, COUNT(*) as clicks FROM app_clicks GROUP BY app ORDER BY clicks DESC LIMIT 10").all(),
    db.prepare("SELECT country, COUNT(*) as clicks FROM app_clicks WHERE country IS NOT NULL GROUP BY country ORDER BY clicks DESC LIMIT 10").all(),
    db.prepare("SELECT page, COUNT(*) as views FROM page_views GROUP BY page ORDER BY views DESC LIMIT 10").all(),

    db.prepare("SELECT clicked_at, app, country, referer FROM app_clicks ORDER BY clicked_at DESC LIMIT 50").all(),
    db.prepare("SELECT viewed_at, page, country FROM page_views ORDER BY viewed_at DESC LIMIT 50").all(),

    db.prepare(`
      SELECT substr(clicked_at, 1, 10) as day, COUNT(*) as clicks
      FROM app_clicks
      WHERE clicked_at >= ?
      GROUP BY day
      ORDER BY day ASC
    `).bind(day30).all(),

    db.prepare(`
      SELECT substr(viewed_at, 1, 10) as day, COUNT(*) as views
      FROM page_views
      WHERE viewed_at >= ?
      GROUP BY day
      ORDER BY day ASC
    `).bind(day30).all(),
  ]);

  const payload = {
    kpi: {
      clicks: {
        total: clicksTotal?.n ?? 0,
        today: clicksToday?.n ?? 0,
        week: clicks7d?.n ?? 0,
        month: clicks30d?.n ?? 0,
      },
      views: {
        total: viewsTotal?.n ?? 0,
        today: viewsToday?.n ?? 0,
        week: views7d?.n ?? 0,
        month: views30d?.n ?? 0,
      },
    },
    topApps: topApps?.results ?? [],
    topCountries: topCountriesClicks?.results ?? [],
    topPages: topPages?.results ?? [],
    recentClicks: recentClicks?.results ?? [],
    recentViews: recentViews?.results ?? [],
    clicksPerDay: clicksPerDay?.results ?? [],
    viewsPerDay: viewsPerDay?.results ?? [],
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
