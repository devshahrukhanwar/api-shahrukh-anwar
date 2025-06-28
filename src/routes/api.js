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

/**
 * @openapi
 * /api/v1/social/posts:
 *   get:
 *     tags:
 *       - Thoughts
 *     summary: Retrieve social media posts
 *     description: Fetches a list of social media posts.
 *     responses:
 *       200:
 *         description: A list of social media posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     blogs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           source:
 *                             type: string
 *                           title:
 *                             type: string
 *                           url:
 *                             type: string
 *                           banner:
 *                             type: string
 *                           date:
 *                             type: string
 *                     twitter:
 *                       type: object
 *                       properties:
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             username:
 *                               type: string
 *                             profile_image_url:
 *                               type: string
 *                         tweets:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               text:
 *                                 type: string
 *                               created_at:
 *                                 type: string
 *                               id:
 *                                 type: string
 */
// Social media posts
const socialController = new SocialController();
apiRouter.get("/social/posts", socialController.getPosts.bind(socialController));

/**
 * @openapi
 * /api/v1/notifications:
 *   post:
 *     tags:
 *       - Contact
 *     summary: Send notifications to all the receivers of contact form
 *     description: Sends notifications for contact form submissions.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
const notificationController = new NotificationController();
apiRouter.post("/notifications", upload.none(), notificationController.sendNotification.bind(notificationController));

/**
 * @openapi
 * /api/v1/clear/cache:
 *   post:
 *     tags:
 *       - Utility
 *     summary: Clear file-based cache
 *     description: Clears all file-based cache.
 *     responses:
 *       200:
 *         description: Cache cleared successfully.
 */
// Clear all the file based cache
apiRouter.route("/clear/cache")
  .get(UtilityController.clearCache)
  .post(UtilityController.clearCache);

/**
 * @openapi
 * /api/v1/generate/banners:
 *   post:
 *     tags:
 *       - Utility
 *     summary: Generate banners
 *     description: Generates banners from given URL via puppeteer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - name
 *             properties:
 *               url:
 *                 type: string
 *               name:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Banners generated successfully.
 */
// Generate banners for projects
apiRouter.post("/generate/banners", upload.none(), PuppeteerController.generateBanners);

module.exports = router;
