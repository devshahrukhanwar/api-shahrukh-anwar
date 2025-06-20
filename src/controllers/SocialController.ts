import { Request, Response } from "express";
import { SocialMediaService } from "../services/social/SocialMediaService.js";
import { TwitterService } from "../services/social/TwitterService.js";

export class SocialController {
  static async getPosts(req: Request, res: Response) {
    const context = new SocialMediaService(new TwitterService());
    const twitterPosts = await context.fetchPosts();
    res.json({
      success: true,
      data: {
        twitter: twitterPosts,
      },
    });
  }
}
