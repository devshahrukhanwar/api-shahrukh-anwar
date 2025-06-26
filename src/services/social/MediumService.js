const axios = require('axios');
const { Log } = require("../../utility");

class MediumService {
  /**
   * Get all the recent posts from Medium using the Medium API.
   * @returns {Promise<void>}
   * @throws {Error} If the request fails or the API returns an error.
   */
  async fetchPosts() {
    try {
      const rssFeed = 'https://medium.com/feed/@devshahrukh';

      const { data } = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${rssFeed}`);

      Log.info("Fetched posts from Medium", { count: data.items.length });

      return data.items.slice(0, 5).map(post => ({
        source: 'Medium',
        title: post.title,
        // description: post.description,
        url: post.link,
        banner: post.thumbnail || this.extractOgImage(post.content),
        date: post.pubDate,
        // html: post.content
      }))
    } catch (err) {
      Log.error("Failed to fetch posts from Medium", err);
      throw new Error(`Failed to fetch posts from Medium: ${err.message}`);
    }
  }

  extractOgImage(html) {
    const match = html.match(/<img[^>]+src="([^">]+)"/)
    return match?.[1] || ''
  }
}

module.exports = { MediumService };