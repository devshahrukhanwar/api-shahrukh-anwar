const { Pool } = require('pg');

class DB {
  static pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Set this in Vercel env vars
    ssl: { rejectUnauthorized: false }
  });

  static async query(text, params) {
    const res = await this.pool.query(text, params);
    return res;
  }
}

module.exports = DB;