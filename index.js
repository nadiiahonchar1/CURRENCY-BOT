const Telegraf = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  return ctx.reply("Welcome to Mono Currency Bot");
});
bot.startPolling();
