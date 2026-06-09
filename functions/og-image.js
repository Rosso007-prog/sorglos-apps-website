// Serves og-image.svg with correct headers for social crawlers.
// Route: /og-image (matched by Cloudflare Pages Functions)
// The static og-image.svg at root is also served directly by Pages,
// this function adds cache-control and correct content-type headers.

export async function onRequestGet(context) {
  const response = await context.env.ASSETS.fetch(
    new Request(new URL("/og-image.svg", context.request.url))
  );

  if (!response.ok) {
    return new Response("Not found", { status: 404 });
  }

  const svg = await response.text();

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Vary": "Accept",
    },
  });
}
