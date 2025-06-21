const axios = require('axios');

const twitter = require('../../mocks/twitter.json');

class TwitterService {
  /**
   * Get all the recent posts from Twitter using the Twitter API.
   * @returns {Promise<void>}
   * @throws {Error} If the request fails or the API returns an error.
   */
  async fetchPosts() {
    const token = process.env.TWITTER_API_KEY;

    try {
      const response = await axios.get(`${process.env.TWITTER_URL}/users/${process.env.TWITTER_USER_ID}/tweets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          max_results: 100,
          exclude: 'replies,retweets',
          'tweet.fields': 'created_at,entities,attachments',
          expansions: 'attachments.media_keys,author_id',
          'media.fields': 'url,preview_image_url,type',
        }
      });

      return response.data;
    } catch (err) {
      throw new Error(`Failed to fetch posts from Twitter: ${err.message}`);
    }
  }

  async fetchDummyPosts() {
    const filteredPosts = twitter.data.filter(
      post =>
      post.entities &&
      post.entities.hashtags &&
      post.entities.hashtags.some(
        hashtag => hashtag.tag && hashtag.tag.toLowerCase() === 'developerlife'
      )
    );
    
    return {
      user: {
        ...twitter.includes.users[0],
      },
      posts: filteredPosts
    }
  }
}

module.exports = { TwitterService };
