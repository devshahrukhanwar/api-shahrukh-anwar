const { SocialMediaService, TwitterService, DevToService } = require("../services");
// const { SocialMediaService } = require("../services/social/SocialMediaService");

class SocialController {
  static async getPosts(_, res) {
    try {
      const devto = new SocialMediaService(new DevToService());
      const twitter = new SocialMediaService(new TwitterService());
      
      const devtoPosts = await devto.fetchPosts();
      const twitterPosts = await twitter.fetchPosts();

      res.status(200).send({
        success: true,
        data: {
          devTo: devtoPosts,
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
