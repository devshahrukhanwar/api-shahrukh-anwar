const {
  SocialMediaService,
  TwitterService,
  DevToService,
  MediumService,
} = require("../services");

class SocialController {
  static async getPosts(_, res) {
    try {
      const devto = new SocialMediaService(new DevToService());
      const medium = new SocialMediaService(new MediumService());
      const twitter = new SocialMediaService(new TwitterService());
      
      const devtoPosts = await devto.fetchPosts();
      const mediumPosts = await medium.fetchPosts();
      const twitterPosts = await twitter.fetchPosts();

      const blogs = [...mediumPosts, ...devtoPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

      res.status(200).send({
        success: true,
        data: {
          blogs,
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
