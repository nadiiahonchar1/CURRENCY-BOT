require("dotenv").config();
const { Telegraf } = require("telegraf");
const axios = require("axios");
const cc = require("currency-codes");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  return ctx.reply("Ласкаво просимо у  Mono Currency Bot");
});

bot.hears(/^[A-Z]+$/i, async (ctx) => {
  const clientCurrCode = ctx.message.text;
  const currency = cc.code(clientCurrCode);
  if (!currency) {
    return ctx.reply("Така валюта не знайдена");
  }
  try {
    const currencyObj = await axios.get(
      "https://api.monobank.ua/bank/currency"
    );
    const foundCurrency = currencyObj.data.find((cur) => {
      return cur.currencyCodeA.toString() === currency.number;
    });
    if (!foundCurrency || !foundCurrency.rateBuy || !foundCurrency.rateSell) {
      return ctx.reply("Така валюта не знайдена");
    }
    // return ctx.reply(JSON.stringify(foundCurrency));
    return ctx.replyWithMarkdown(`
ВАЛЮТА:   *${currency.code}*
ПОКУПКА:  *${foundCurrency.rateBuy} грн*
ПРОДАЖ:   *${foundCurrency.rateSell} грн*
          `);
  } catch (error) {
    return ctx.reply(error);
  }
});
bot.startPolling();
