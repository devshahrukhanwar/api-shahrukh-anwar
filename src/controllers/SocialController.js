const { TwitterService } = require("../services/social/TwitterService");
const { SocialMediaService } = require("../services/social/SocialMediaService");

class SocialController {
  static async getPosts(_, res) {
    const context = new SocialMediaService(new TwitterService());
    const twitterPosts = await context.fetchPosts();
    res.send({
      success: true,
      data: {
        twitter: twitterPosts,
      },
    });
  }
}

module.exports = { SocialController };
