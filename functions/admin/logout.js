import { verifySessionCookie, deleteSession, expiredSessionCookie } from "../lib/session.js";

export async function onRequestGet(context) {
  const { request, env } = context;
  const SESSION_SECRET = env.SESSION_SECRET || "";

  const token = await verifySessionCookie(request, SESSION_SECRET);
  if (token && env.DB) {
    await deleteSession(env.DB, token).catch(() => {});
  }

  const origin = new URL(request.url).origin;
  return new Response(null, {
    status: 302,
    headers: {
      Location: `${origin}/admin/login/`,
      "Set-Cookie": expiredSessionCookie(),
    },
  });
}
