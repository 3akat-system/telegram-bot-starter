# Telegram Bot Starter

> Production-ready Telegram bot template with PostgreSQL, PM2, and deploy-ready setup.

## Stack

- **Node.js** + **node-telegram-bot-api**
- **PostgreSQL** — persistent storage
- **PM2** — process management, zero-downtime restarts
- **Express** — webhook mode support

## Features

- Command handler with auto-registration
- Inline keyboard builder
- PostgreSQL connection pool with migrations
- Environment-based config (.env)
- PM2 ecosystem file
- Health check endpoint
- Error handling with graceful shutdown

## Quick Start

```bash
git clone https://github.com/3akat-system/telegram-bot-starter.git
cd telegram-bot-starter
cp .env.example .env
npm install
npm run dev
```

## Project Structure

```
src/
  bot.js          — entry point
  commands/       — command handlers
  keyboards/      — inline keyboard builders
  db/             — PostgreSQL pool + migrations
  middleware/      — rate limit, auth
  utils/          — logger, helpers
```

## Deploy

```bash
pm2 start ecosystem.config.js
```

## License

MIT