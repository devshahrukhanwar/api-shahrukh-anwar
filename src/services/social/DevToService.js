const axios = require('axios');

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
          per_page: 5,
          username: process.env.DEVTO_USERNAME
        }
      });

      return data.map(blog => ({
        source: 'Dev.to',
        date: blog.published_at,
        title: blog.title,
        url: blog.url,
        banner: blog.cover_image,
      }));
    } catch (err) {
      throw new Error(`Failed to fetch posts from Dev.to: ${err.message}`);
    }
  }
}

module.exports = { DevToService };