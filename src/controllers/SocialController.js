const { Cache } = require("../utility");
const {
  SocialMediaService,
  TwitterService,
  DevToService,
  MediumService,
} = require("../services");

class SocialController {
  devtoService;
  mediumService;
  twitterService;
  
  constructor() {
    this.devtoService = new SocialMediaService(new DevToService());
    this.mediumService = new SocialMediaService(new MediumService());
    this.twitterService = new SocialMediaService(new TwitterService());
  }

  async getPosts(_, res) {
    try {
      const cacheKey = "social";
      const cachedPosts = Cache.get(cacheKey);

      if (Cache.has(cacheKey)) {
        return res.status(200).send({
          success: true,
          data: cachedPosts,
        });
      }

      // If no cached posts, fetch from services
      Cache.clear();
      const devtoPosts = await this.devtoService.fetchPosts();
      const mediumPosts = await this.mediumService.fetchPosts();
      const twitterPosts = await this.twitterService.fetchPosts();

      const blogs = [...mediumPosts, ...devtoPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

      Cache.set(cacheKey, {
        blogs,
        twitter: twitterPosts,
      });

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
