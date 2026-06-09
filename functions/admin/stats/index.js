import { initializeDatabase } from "../../lib/db.js";
import { verifySessionCookie, isValidSession } from "../../lib/session.js";

function absoluteUrl(request, path) {
  const url = new URL(request.url);
  return `${url.origin}${path}`;
}

async function requireAuth(request, env) {
  const SESSION_SECRET = env.SESSION_SECRET || "";
  const token = await verifySessionCookie(request, SESSION_SECRET);
  if (!token) return false;
  if (!env.DB) return false;
  await initializeDatabase(env.DB);
  return await isValidSession(env.DB, token);
}

export async function onRequestGet(context) {
  const { request, env } = context;

  const authenticated = await requireAuth(request, env);
  if (!authenticated) {
    return Response.redirect(absoluteUrl(request, "/admin/login/"), 302);
  }

  return context.next();
}
