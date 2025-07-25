const axios = require('axios');
const { Log } = require("../../utility");

class DevToService {
  /**
   * Get all the recent posts from Dev.to using the Dev.to API.
   * @returns {Promise<void>}
   * @throws {Error} If the request fails or the API returns an error.
   */
  async fetchPosts() {
    try {
      const { data } = await axios.get(`${process.env.DEVTO_URL}/articles`, {
        params: {
          username: process.env.DEVTO_USERNAME,
          per_page: 5
        }
      });

      Log.info("Fetched posts from Dev.to", { count: data.length });

      return data.map(blog => ({
        source: 'Dev.to',
        date: blog.published_at,
        title: blog.title,
        url: blog.url,
        banner: blog.cover_image,
      }));
    } catch (err) {
      Log.error("Failed to fetch posts from Dev.to", err);
      throw new Error(`Failed to fetch posts from Dev.to: ${err.message}`);
    }
  }
}

module.exports = { DevToService };