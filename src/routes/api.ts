import express from "express";
import { SocialController } from "../controllers/SocialController.js";

const router = express.Router();

// Social media posts
router.get("/social/posts", SocialController.getPosts);

export default router;
