const { DB } = require('../utility');

class Post {
  static async create({ name, email, message }) {
    const result = await DB.query(
      'INSERT INTO posts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    return result.rows[0];
  }
}

module.exports = Post;