const { TwitterService } = require("../services/social/TwitterService");
const { SocialMediaService } = require("../services/social/SocialMediaService");

class SocialController {
  static async getPosts(_, res) {
    try {
      const context = new SocialMediaService(new TwitterService());
      const twitterPosts = await context.fetchDummyPosts();

      res.status(200).send({
        success: true,
        data: {
          twitter: twitterPosts,
        },
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Failed to fetch posts",
        error: error.message,
      });
    }
  }
}

module.exports = { SocialController };
