const { Cache, Log, Response } = require("../utility");
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
        Log.info(`Returning cached posts for key: ${cacheKey}`);
        return res.status(200).json(Response.success("Social posts", cachedPosts));
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

      Log.info(`Fetched and cached social posts for key: ${cacheKey}`);
      return res.status(200).json(Response.success("Social posts", { blogs, twitter: twitterPosts }));
    } catch (error) {
      Log.error("Failed to fetch social posts", error);
      return res.status(500).json(Response.error("Failed to fetch social posts", error));
    }
  }
}

module.exports = { SocialController };
