const { DB, Log } = require('../utility');

class Post {

  /**
   * Create a new post
   * @param {Object} param0 - The post details
   * @param {string} param0.name - The name of the person creating the post
   * @param {string} param0.email - The email of the person creating the post
   * @param {string} param0.message - The message content of the post
   * @returns {Promise<Object>} Returns the created post
   */
  static async create({ name, email, message }) {
    const result = await DB.query(
      'INSERT INTO posts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    if (result.error) {
      Log.error(`Error creating post: ${result.error.message}`);
      throw new Error(`Failed to create post: ${result.error.message}`);
    }

    Log.info(`Post created successfully: ${result[0].id}`);

    return result[0];
  }

  /**
   * Get all posts
   * @returns {Promise<Array>} Returns all posts ordered by creation date
   */
  static async all() {
    const result = await DB.query('SELECT * FROM posts ORDER BY created_at DESC');

    if (result.error) {
      Log.error(`Error fetching posts: ${result.error.message}`);
      throw new Error(`Failed to fetch posts: ${result.error.message}`);
    }

    Log.info(`Fetched ${result.length} posts successfully`);

    return result;
  }
}

module.exports = Post;