require('dotenv/config');
const { Telegraf, Markup } = require('telegraf');
const db = require('./db');

const bot = new Telegraf(process.env.BOT_TOKEN);

// ==================== /start ====================

bot.start(async (ctx) => {
  const user = db.findOrCreateUser(ctx.from);

  await ctx.replyWithHTML(
    `👋 <b>Привет, ${ctx.from.first_name}!</b>\n\n` +
    `Это стартовый шаблон бота.\n` +
    `Используй кнопки ниже ▼`,
    Markup.inlineKeyboard([
      [Markup.button.callback('📊 Статус', 'status')],
      [Markup.button.callback('⚙️ Настройки', 'settings')],
      [Markup.button.callback('❓ Помощь', 'help')],
    ])
  );
});

// ==================== Callbacks ====================

bot.action('status', async (ctx) => {
  await ctx.answerCbQuery();
  const user = db.findOrCreateUser(ctx.from);
  await ctx.editMessageText(
    `📊 <b>Статус</b>\n\n` +
    `<b>ID:</b> <code>${user.telegram_id}</code>\n` +
    `<b>Имя:</b> ${user.first_name || '—'}\n` +
    `<b>Регистрация:</b> ${user.created_at}`,
    { parse_mode: 'HTML', ...Markup.inlineKeyboard([[Markup.button.callback('← Назад', 'back')]]) }
  );
});

bot.action('settings', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    `⚙️ <b>Настройки</b>\n\nЗдесь будут настройки.`,
    { parse_mode: 'HTML', ...Markup.inlineKeyboard([[Markup.button.callback('← Назад', 'back')]]) }
  );
});

bot.action('help', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    `❓ <b>Помощь</b>\n\n/start — главное меню\n/help — эта справка`,
    { parse_mode: 'HTML', ...Markup.inlineKeyboard([[Markup.button.callback('← Назад', 'back')]]) }
  );
});

bot.action('back', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
    `👋 <b>Главное меню</b>\n\nВыбери действие ▼`,
    { parse_mode: 'HTML', ...Markup.inlineKeyboard([
      [Markup.button.callback('📊 Статус', 'status')],
      [Markup.button.callback('⚙️ Настройки', 'settings')],
      [Markup.button.callback('❓ Помощь', 'help')],
    ]) }
  );
});

bot.command('help', (ctx) => ctx.replyWithHTML('❓ /start — главное меню'));

// ==================== Launch ====================

bot.catch((err, ctx) => {
  console.error(`Bot error [${ctx.updateType}]:`, err.message);
});

bot.launch(async () => {
  console.log(`Bot started: @${bot.botInfo.username}`);
  await bot.telegram.setMyCommands([
    { command: 'start', description: 'Главное меню' },
    { command: 'help', description: 'Помощь' },
  ]);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
