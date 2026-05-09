const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'bot.db');
let db;

function getDb() {
  if (!db) {
    const fs = require('fs');
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    migrate(db);
  }
  return db;
}

function migrate(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telegram_id INTEGER UNIQUE NOT NULL,
      username TEXT,
      first_name TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

function findOrCreateUser(tg) {
  const d = getDb();
  let user = d.prepare('SELECT * FROM users WHERE telegram_id = ?').get(tg.id);
  if (!user) {
    const info = d.prepare(
      'INSERT INTO users (telegram_id, username, first_name) VALUES (?, ?, ?)'
    ).run(tg.id, tg.username || null, tg.first_name || null);
    user = d.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
  }
  return user;
}

module.exports = { getDb, findOrCreateUser };
