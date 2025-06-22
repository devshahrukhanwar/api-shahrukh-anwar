const axios = require('axios');
const fs = require('fs');
const path = require('path');
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

      return response.data;
    } catch (err) {
      throw new Error(`Failed to fetch posts from Twitter: ${err.message}`);
    }
  }

  async fetchPosts() {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const tempDir = path.join(__dirname, '../../mocks/temp');
    const tempFile = path.join(tempDir, `${today}-twitter.json`);

    // Check if file exists
    if (fs.existsSync(tempFile)) {
      const cached = fs.readFileSync(tempFile, 'utf-8');
      return JSON.parse(cached);
    }

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

    // Write to temp file
    fs.writeFileSync(tempFile, JSON.stringify(response, null, 2), 'utf-8');

    return response;
  }
}

module.exports = { TwitterService };
