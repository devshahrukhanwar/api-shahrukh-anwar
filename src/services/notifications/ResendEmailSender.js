const resend = require("resend");

const { Log } = require("../../utility");
const { NotificationSender } = require("./NotificationSender");

class ResendEmailSender extends NotificationSender {
  to = [];
  sender = {};

  resend = new resend.Resend(process.env.RESEND_API_KEY);

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
      const to = this.to.length ? this.to : ResendEmailSender.TO;

      let sender = (this.sender && Object.keys(this.sender).length > 0) ? this.sender : ResendEmailSender.SENDER;
      sender = { ...sender, email: process.env.SENDER_EMAIL }

      Log.info("Sending email", {
        to,
        sender,
        subject: content.subject,
      });

      return await this.resend.emails.send({
        from: `${to[0].name} <${sender.email}>`,
        to: to.map(t => `${sender.name} <${sender.email}>`),
        subject: content.subject,
        html: content.html
      });
    }
    catch (err) {
      Log.error("Failed to send email", err);
      throw new Error(`Failed to send email: ${err.message}`);
    }
  }
}

module.exports = { ResendEmailSender }