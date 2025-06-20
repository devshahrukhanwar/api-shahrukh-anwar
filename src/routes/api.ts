import express from "express";
import { SocialController } from "../controllers/SocialController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "API is working" });
});

// Social media posts
router.get("/social/posts", SocialController.getPosts);

export default router;
