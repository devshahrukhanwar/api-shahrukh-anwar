const express = require("express");
const { SocialController } = require("../controllers/SocialController");

const router = express.Router();

router.get("/", (_, res) => {
  res.status(200).json({ status: "API is working" });
});

const apiRouter = express.Router();
router.use("/api", apiRouter);

// Social media posts
apiRouter.get("/social/posts", SocialController.getPosts);

module.exports = router;
