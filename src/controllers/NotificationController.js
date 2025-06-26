const { Log, Response, getHTML } = require("../utility");
const socials = require('../config/socials.json');
const { Notification, EmailSender, TelegramSender } = require('../services');

class NotificationController {
  notifyTG
  notifyEmail
  notifyThanks

  constructor() {
    this.notifyEmail = new Notification(new EmailSender())
    this.notifyTG = new Notification(new TelegramSender())
    this.notifyThanks = new Notification(new EmailSender())
  }

  /**
   * Send notification emails and messages
   * @param {*} req 
   * @param {*} res 
   */
  async sendNotification(req, res) {
    try {
      const { name, email, message } = req.body;
      const client = { name, email, message };
      const admin = {  name: process.env.RECEIVER_NAME, email: process.env.RECEIVER_EMAIL };

      this.notifyEmail.setSender({ name, email });
      const notifyHTML = await getHTML(req.app, 'notifications/email-notification', {
        client,
        admin,
        appURL: process.env.APP_URL
      });
      
      this.notifyThanks.setTo([{ name, email }]);
      const thanksHTML = await getHTML(req.app, 'notifications/thanks-notification', {
        client,
        admin,
        socials,
        appURL: process.env.APP_URL
      });

      const TGHTML = await getHTML(req.app, 'notifications/telegram-notification', {
        client,
        appURL: process.env.APP_URL
      });

      await Promise.all([
        this.notifyTG.send({ text: TGHTML}),
        this.notifyEmail.send({
          html: notifyHTML,
          subject: `New contact form submission from ${name}`
        }),
        this.notifyThanks.send({
          html: thanksHTML,
          subject: `Thank you for contacting me, ${client.name}`
        })
      ]);

      Log.info("Notifications sent successfully", { name, email });
      return res.status(200).json(Response.success("Notifications sent successfully"));
    } catch (error) {
      Log.error("Error sending notification", error);
      return res.status(500).json(Response.error("Error sending notification", error.message));
    }
  }
}

module.exports = { NotificationController };