const axios = require('axios');
const { Log } = require("../../utility");
const { NotificationSender } = require('./NotificationSender');

class TelegramSender extends NotificationSender {
	static URL = `${process.env.TELEGRAM_BASE_URL}${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

	async send(content) {
		try {
			Log.info("Sending message via Telegram");
			return await axios.post(TelegramSender.URL, {
				parse_mode: 'HTML',
				chat_id: process.env.TELEGRAM_CHAT_ID,
				text: content.text
			});
		}
		catch (err) {
			Log.error("Failed to send message via Telegram", err);
			throw new Error(`Failed to send message via Telegram: ${err.message}`);
		}
	}
}

module.exports = { TelegramSender };
