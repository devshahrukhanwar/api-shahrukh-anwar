const axios = require("axios");

const { Log } = require("../../utility");
const { NotificationSender } = require("./NotificationSender");

class EmailSender extends NotificationSender {
  to = [];
  sender = {};

	static URL = `${process.env.BREVO_BASE_URL}/smtp/email`;

	static SENDER = {
		name: process.env.SENDER_NAME,
		email: process.env.SENDER_EMAIL,
	};

  static TO = [
    {
      name: process.env.RECEIVER_NAME,
      email: process.env.RECEIVER_EMAIL,
    },
  ];

  static HEADERS = {
    "Api-Key": process.env.BREVO_API_KEY,
  };

  /**
   * Sets the recipients for the email.
   * @param {*} recipients 
   * @returns 
   */
  setTo(recipients) {
    this.to = recipients;

    return this;
  }

  /**
   * Sets the sender for the email. 
   * @param {*} sender 
   * @returns 
   */
  setSender(sender) {
    this.sender = sender;

    return this;
  }

  async send(content) {
    try {
      const to = this.to.length ? this.to : EmailSender.TO;

      let sender = (this.sender && Object.keys(this.sender).length > 0) ? this.sender : EmailSender.SENDER;
      sender = { ...sender, email: process.env.SENDER_EMAIL }

      Log.info("Sending email", {
        to,
        sender,
        subject: content.subject,
      });

      return await axios.post(
        EmailSender.URL,
        {
          to,
          sender,
          subject: content.subject,
          htmlContent: content.html,
        },
        { headers: EmailSender.HEADERS }
      );
    }
    catch (err) {
      Log.error("Failed to send email", err);
      throw new Error(`Failed to send email: ${err.message}`);
    }
  }
}

module.exports = { EmailSender }