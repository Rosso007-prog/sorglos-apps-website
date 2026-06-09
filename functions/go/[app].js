import { resolveAppLink } from "../lib/app-links.js";
import { recordClick, initializeDatabase } from "../lib/db.js";

export async function onRequestGet(context) {
  const { params, request, env } = context;
  const appKey = (params.app || "").toLowerCase();

  const destination = resolveAppLink(appKey);

  if (destination === undefined) {
    return new Response("App nicht gefunden.", { status: 404 });
  }

  if (destination === null) {
    return new Response(
      `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App bald verfügbar | Sorglos Apps</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #07111d; color: #f3f7fd;
           display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .box { text-align: center; max-width: 400px; padding: 2rem; }
    h1 { font-size: 1.5rem; margin: 0 0 1rem; }
    p { color: #a5b3c8; }
    a { color: #8ff4c8; }
  </style>
</head>
<body>
  <div class="box">
    <h1>App bald verfügbar</h1>
    <p>Diese App ist noch nicht im App Store verfügbar. Schau bald wieder vorbei!</p>
    <p><a href="/">Zurück zur Startseite</a></p>
  </div>
</body>
</html>`,
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Build redirect URL with UTM parameters
  let redirectUrl;
  try {
    redirectUrl = new URL(destination);
    const params = redirectUrl.searchParams;
    if (!params.has("utm_source")) params.set("utm_source", "sorglos-apps");
    if (!params.has("utm_medium")) params.set("utm_medium", "website");
    if (!params.has("utm_campaign")) params.set("utm_campaign", "app_click");
    if (!params.has("utm_content")) params.set("utm_content", appKey);
  } catch {
    redirectUrl = { href: destination };
  }

  // Track click asynchronously (do not block redirect)
  if (env.DB) {
    const country = request.headers.get("CF-IPCountry") || null;
    const referer = request.headers.get("Referer") || null;
    const userAgent = request.headers.get("User-Agent") || null;
    const url = new URL(request.url);

    context.waitUntil(
      initializeDatabase(env.DB)
        .then(() =>
          recordClick(env.DB, {
            app: appKey,
            country,
            referer,
            userAgent,
            pathname: url.pathname,
          })
        )
        .catch(() => {})
    );
  }

  return Response.redirect(redirectUrl.href || destination, 302);
}
