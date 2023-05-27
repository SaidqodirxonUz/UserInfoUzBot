require("dotenv").config();
const TelegramApi = require("node-telegram-bot-api");
const token = process.env.BOT_TOKEN;

const bot = new TelegramApi(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    bot.sendMessage(
      chatId,
      `<b>Salom ${msg.chat.first_name} botga hush kelibsiz!\n\nProfilingiz haqida ma'lumot olishni istasangiz botga /info buyrug'ini bering.</b>`,
      { parse_mode: "HTML" }
    );
  }

  if (text === "/info") {
    const sendText = `<b>Hurmatli ${msg.chat.first_name}!</b>\n\n<b>Sizning Username:</b> ${msg.from.username}\n<b>Sizning ID raqamingiz:</b> <code>${msg.from.id}</code>`;

    bot.sendMessage(chatId, sendText, { parse_mode: "HTML" });

    setTimeout(() => {
      // Premium bor yoki yo'qligini tekshirish
      const isPremium = msg.from.is_premium;

      if (isPremium) {
        bot.sendMessage(chatId, "<b>Siz Premium sotib olgan ekansiz</b>", {
          parse_mode: "HTML",
        });
      } else {
        bot.sendMessage(chatId, "<b>Siz Premium sotib olmagan ekansiz</b>", {
          parse_mode: "HTML",
        });
      }
    }, 100);
  }
});

console.log("Bot ishladi");
