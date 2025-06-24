const express = require("express");
const { SocialController, PuppeteerController } = require("../controllers");

const upload = require('multer')();
const router = express.Router();

router.get("/", (_, res) => {
  res.status(200).json({ status: "API is working" });
});

const apiRouter = express.Router();
router.use("/api", apiRouter);

// Social media posts
const socialController = new SocialController();
apiRouter.get("/social/posts", socialController.getPosts.bind(socialController));

// Generate banners for projects
apiRouter.post("/generate/banners", upload.none(), PuppeteerController.generateBanners);

module.exports = router;
