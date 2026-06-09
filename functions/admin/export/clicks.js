import { initializeDatabase } from "../../lib/db.js";
import { verifySessionCookie, isValidSession } from "../../lib/session.js";
import { buildCsv } from "../../lib/csv.js";

async function requireAuth(request, env) {
  const token = await verifySessionCookie(request, env.SESSION_SECRET || "");
  if (!token) return false;
  if (!env.DB) return false;
  await initializeDatabase(env.DB);
  return await isValidSession(env.DB, token);
}

export async function onRequestGet(context) {
  const { request, env } = context;

  if (!(await requireAuth(request, env))) {
    const origin = new URL(request.url).origin;
    return Response.redirect(`${origin}/admin/login/`, 302);
  }

  await initializeDatabase(env.DB);

  const result = await env.DB
    .prepare(
      `SELECT id, app, clicked_at, country, referer, user_agent, pathname
       FROM app_clicks
       ORDER BY clicked_at DESC
       LIMIT 100000`
    )
    .all();

  const rows = result?.results ?? [];
  const headers = ["id", "app", "clicked_at", "country", "referer", "user_agent", "pathname"];
  const csv = buildCsv(headers, rows);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="sorglos-app-clicks.csv"',
      "Cache-Control": "no-store",
    },
  });
}
