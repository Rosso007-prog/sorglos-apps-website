import { recordPageView, initializeDatabase } from "../lib/db.js";

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ ok: false, error: "No DB" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const page = (body.page || "/").slice(0, 500);
  const country = request.headers.get("CF-IPCountry") || null;

  context.waitUntil(
    initializeDatabase(env.DB)
      .then(() => recordPageView(env.DB, { page, country }))
      .catch(() => {})
  );

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://sorglos-apps.de",
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://sorglos-apps.de",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
