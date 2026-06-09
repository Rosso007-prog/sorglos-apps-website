const SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours
const COOKIE_NAME = "sa_session";

async function hmacSign(secret, data) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function hmacVerify(secret, data, signature) {
  const expected = await hmacSign(secret, data);
  return expected === signature;
}

export function generateToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/[+/=]/g, c =>
    c === "+" ? "-" : c === "/" ? "_" : ""
  );
}

export async function createSignedCookie(token, secret) {
  const sig = await hmacSign(secret, token);
  const value = `${token}.${sig}`;
  const expires = new Date(Date.now() + SESSION_DURATION_MS).toUTCString();
  return `${COOKIE_NAME}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/admin; Expires=${expires}`;
}

export async function verifySessionCookie(request, secret) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;

  const [token, sig] = match[1].split(".");
  if (!token || !sig) return null;

  const valid = await hmacVerify(secret, token, sig);
  return valid ? token : null;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/admin; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export async function isValidSession(db, token) {
  if (!token) return false;
  const now = new Date().toISOString();
  const row = await db
    .prepare(`SELECT id FROM admin_sessions WHERE session_token = ? AND expires_at > ?`)
    .bind(token, now)
    .first();
  return row !== null;
}

export async function storeSession(db, token) {
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_DURATION_MS);
  await db
    .prepare(`INSERT INTO admin_sessions (session_token, created_at, expires_at) VALUES (?, ?, ?)`)
    .bind(token, now.toISOString(), expires.toISOString())
    .run();
}

export async function deleteSession(db, token) {
  await db
    .prepare(`DELETE FROM admin_sessions WHERE session_token = ?`)
    .bind(token)
    .run();
}

export function expiredSessionCookie() {
  return clearSessionCookie();
}
