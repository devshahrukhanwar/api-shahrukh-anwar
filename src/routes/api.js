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
apiRouter.get("/social/posts", SocialController.getPosts);

// Generate banners for projects
apiRouter.post("/generate/banners", upload.none(), PuppeteerController.generateBanners);

module.exports = router;
