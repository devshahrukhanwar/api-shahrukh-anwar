const {  SocialMediaService } = require('./social/SocialMediaService');
const { TwitterService } = require('./social/TwitterService');
const { DevToService } = require('./social/DevToService');
const { MediumService } = require('./social/MediumService');

const { BrevoEmailSender } = require('./notifications/BrevoEmailSender');
const { ResendEmailSender } = require('./notifications/ResendEmailSender');
const { Notification } = require('./notifications/Notification');
const { NotificationSender } = require('./notifications/NotificationSender');
const { TelegramSender } = require('./notifications/TelegramSender');

module.exports = {
  SocialMediaService,
  TwitterService,
  DevToService,
  MediumService,
  Notification,
	BrevoEmailSender,
  ResendEmailSender,
	TelegramSender,
	NotificationSender,
};