const express = require("express");
const { 
  NotificationController,
  PuppeteerController,
  SocialController,
  UtilityController
} = require("../controllers");

const upload = require('multer')();
const router = express.Router();

router.get("/", (_, res) => {
  res.status(200).json({ status: "API is working" });
});

const apiRouter = express.Router();
router.use("/api/v1", apiRouter);

// Social media posts
const socialController = new SocialController();
apiRouter.get("/social/posts", socialController.getPosts.bind(socialController));

// Send notifications for contact form submissions
const notificationController = new NotificationController();
apiRouter.post("/notifications", upload.none(), notificationController.sendNotification.bind(notificationController));

// Generate banners for projects
apiRouter.post("/generate/banners", upload.none(), PuppeteerController.generateBanners);

// Clear all the file based cache
apiRouter.route("/clear/cache")
  .get(UtilityController.clearCache)
  .post(UtilityController.clearCache);

module.exports = router;
