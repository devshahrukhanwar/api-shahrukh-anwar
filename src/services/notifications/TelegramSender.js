const axios = require('axios');
const { NotificationSender } = require('./NotificationSender');

class TelegramSender extends NotificationSender {
	static URL = `${process.env.TELEGRAM_BASE_URL}${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

	async send(content) {
		return await axios.post(TelegramSender.URL, {
			parse_mode: 'HTML',
			chat_id: process.env.TELEGRAM_CHAT_ID,
			text: content.text
		});
	}
}

module.exports = { TelegramSender };
