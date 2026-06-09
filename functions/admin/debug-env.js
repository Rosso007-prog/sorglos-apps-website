export async function onRequestGet(context) {
  const { env } = context;

  const has = (val) => (val ? "JA" : "NEIN");

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex,nofollow">
  <title>Env Debug | Sorglos Apps Admin</title>
  <style>
    body { font-family: monospace; background: #07111d; color: #f3f7fd;
           display: flex; justify-content: center; padding: 4rem 1rem; margin: 0; }
    .box { max-width: 480px; width: 100%; }
    h1 { font-size: 1.1rem; margin: 0 0 1.5rem; color: #8ff4c8; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 0.6rem 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
    td:first-child { color: #a5b3c8; }
    td:last-child { font-weight: 700; }
    .ja  { color: #8ff4c8; }
    .nein { color: #ff6b7a; }
    .note { margin-top: 1.5rem; font-size: 0.8rem; color: #a5b3c8; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="box">
    <h1>Environment Variable Check</h1>
    <table>
      <tr>
        <td>ADMIN_PASSWORD vorhanden</td>
        <td class="${env.ADMIN_PASSWORD ? "ja" : "nein"}">${has(env.ADMIN_PASSWORD)}</td>
      </tr>
      <tr>
        <td>SESSION_SECRET vorhanden</td>
        <td class="${env.SESSION_SECRET ? "ja" : "nein"}">${has(env.SESSION_SECRET)}</td>
      </tr>
      <tr>
        <td>ADMIN_USERNAME vorhanden</td>
        <td class="${env.ADMIN_USERNAME ? "ja" : "nein"}">${has(env.ADMIN_USERNAME)} ${env.ADMIN_USERNAME ? "" : "(Fallback: admin)"}</td>
      </tr>
      <tr>
        <td>DB Binding vorhanden</td>
        <td class="${env.DB ? "ja" : "nein"}">${has(env.DB)}</td>
      </tr>
    </table>
    <p class="note">
      Keine Werte werden angezeigt – nur ob die Variable gesetzt ist.<br>
      Diese Seite nach der Diagnose wieder entfernen.
    </p>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
