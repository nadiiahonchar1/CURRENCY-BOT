require("dotenv").config();
const { Telegraf } = require("telegraf");
const  axios  = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  return ctx.reply("Welcome to Mono Currency Bot");
});

bot.hears('hi', (ctx) => {
    axios.get("https://api.monobank.ua/bank/currency").then((res) => {
        console.log(res.data[0]);
        return ctx.reply(res.data[0])
    }).catch((err) => {
        return ctx.reply(err);
    });
})
bot.startPolling();
