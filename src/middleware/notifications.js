const { Log, Response } = require("../utility");

class NotificationsMiddleware {
  static origins = [
    process.env.APP_URL,
    process.env.API_URL
  ];

  static handle(req, res, next) {
    const origin = req.get("Origin");

    if (process.env.APP_ENV !== "local" && !NotificationsMiddleware.origins.includes(origin)) {
      Log.warn("Notifications access denied due to origin", { ip: req.ip, userAgent: req.get('User-Agent'), origin });
      return res.status(403).json(Response.error("Notifications access is restricted"));
    }

    next();
  }
}

module.exports = { NotificationsMiddleware };