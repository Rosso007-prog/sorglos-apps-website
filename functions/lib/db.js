export async function initializeDatabase(db) {
  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS app_clicks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        app TEXT NOT NULL,
        clicked_at TEXT NOT NULL,
        country TEXT,
        referer TEXT,
        user_agent TEXT,
        pathname TEXT
      )
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_app_clicks_app
      ON app_clicks(app)
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_app_clicks_clicked_at
      ON app_clicks(clicked_at)
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_app_clicks_country
      ON app_clicks(country)
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS page_views (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page TEXT NOT NULL,
        viewed_at TEXT NOT NULL,
        country TEXT
      )
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_page_views_page
      ON page_views(page)
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at
      ON page_views(viewed_at)
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_token TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL
      )
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_admin_sessions_token
      ON admin_sessions(session_token)
    `),
  ]);
}

export async function recordClick(db, { app, country, referer, userAgent, pathname }) {
  await initializeDatabase(db);
  const now = new Date().toISOString();
  const shortUA = userAgent ? userAgent.substring(0, 200) : null;
  await db.prepare(
    `INSERT INTO app_clicks (app, clicked_at, country, referer, user_agent, pathname)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(app, now, country || null, referer || null, shortUA, pathname || null).run();
}

export async function recordPageView(db, { page, country }) {
  await initializeDatabase(db);
  const now = new Date().toISOString();
  await db.prepare(
    `INSERT INTO page_views (page, viewed_at, country) VALUES (?, ?, ?)`
  ).bind(page, now, country || null).run();
}
