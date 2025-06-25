
class Notification {
	notification;

	constructor(notification) {
		this.notification = notification;
	}

	setTo(contact) {
		this.notification.setTo(contact);
		return this;
	}
	setSender(sender) {
		this.notification.setSender(sender);
		return this;
	}
	send(content) {
		return this.notification.send(content);
	}
}

module.exports = { Notification };
