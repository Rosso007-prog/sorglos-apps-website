import { initializeDatabase } from "../lib/db.js";
import { generateToken, createSignedCookie, storeSession } from "../lib/session.js";

function absoluteUrl(request, path) {
  const url = new URL(request.url);
  return `${url.origin}${path}`;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const ADMIN_PASSWORD = env.ADMIN_PASSWORD;
  const ADMIN_USERNAME = env.ADMIN_USERNAME || "admin";
  const SESSION_SECRET = env.SESSION_SECRET;

  if (!ADMIN_PASSWORD || !SESSION_SECRET) {
    return new Response("Server-Konfiguration unvollständig.", { status: 500 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return Response.redirect(absoluteUrl(request, "/admin/login/?error=1"), 302);
  }

  const username = formData.get("username") || "";
  const password = formData.get("password") || "";

  const usernameOk = username === ADMIN_USERNAME;
  const passwordOk = password === ADMIN_PASSWORD;

  if (!usernameOk || !passwordOk) {
    return Response.redirect(absoluteUrl(request, "/admin/login/?error=1"), 302);
  }

  await initializeDatabase(env.DB);

  const token = generateToken();
  await storeSession(env.DB, token);
  const cookie = await createSignedCookie(token, SESSION_SECRET);

  return new Response(null, {
    status: 302,
    headers: {
      Location: absoluteUrl(request, "/admin/stats/"),
      "Set-Cookie": cookie,
    },
  });
}

export async function onRequestGet(context) {
  return context.next();
}
