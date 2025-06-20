const express = require("express");
const { SocialController } = require("../controllers/SocialController");

const router = express.Router();

router.get("/", (_, res) => {
  res.status(200).json({ status: "API is working" });
});

// Social media posts
router.get("/social/posts", SocialController.getPosts);

module.exports = router;
