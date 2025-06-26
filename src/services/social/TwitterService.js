const axios = require('axios');
const { Log } = require("../../utility");
const twitter = require('../../mocks/twitter.json'); // Mock data for testing

class TwitterService {
  /**
   * Get all the recent posts from Twitter using the Twitter API.
   * @returns {Promise<void>}
   * @throws {Error} If the request fails or the API returns an error.
   */
  async fetchTweets() {
    const token = process.env.TWITTER_API_KEY;

    try {
      const response = await axios.get(`${process.env.TWITTER_URL}/users/${process.env.TWITTER_USER_ID}/tweets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          max_results: 100,
          exclude: 'replies,retweets',
          since_id: '1884599896805978267',
          expansions: 'author_id',
          'tweet.fields': 'created_at,entities',
          'user.fields': 'id,name,username,profile_image_url',
        }
      });

      Log.info("Fetched posts from Twitter", { count: response.data.length });
      return response.data;
    } catch (err) {
      Log.error("Failed to fetch posts from Twitter", err);
      throw new Error(`Failed to fetch posts from Twitter: ${err.message}`);
    }
  }

  async fetchPosts() {
    // const twitter = await this.fetchTweets();
    const filteredPosts = twitter.data.filter(
      post =>
        post.entities &&
        post.entities.hashtags &&
        post.entities.hashtags.some(
          hashtag => hashtag.tag && hashtag.tag.toLowerCase() === 'developerlife'
        )
    );

    /** Updating the user object to give bigger profile images */
    const user = {
      ...twitter.includes.users[0],
      profile_image_url: twitter.includes.users[0].profile_image_url.replace('_normal', '_400x400')
    };

    const response = {
      user,
      tweets: filteredPosts
    };

    return response;
  }
}

module.exports = { TwitterService };
