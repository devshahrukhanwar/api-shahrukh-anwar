const { neon } = require('@neondatabase/serverless');
const { Log } = require('./log');

const DB_SSLMODE = process.env.PGSSLMODE || 'require';
const DB_CHANNELBINDING = process.env.PGCHANNELBINDING || 'require';

const DATABASE_URL = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?sslmode=${DB_SSLMODE}&channel_binding=${DB_CHANNELBINDING}`;

class DB {
  /**
   * Execute a SQL query against the database
   * @param {string} text - The SQL query string
   * @param {Array} params - The parameters for the SQL query
   * @returns {Promise<Object>} Returns the result of the query
   */
  static async query(text, params) {
    const sql = neon(`${DATABASE_URL}`);
    const res = await sql.query(text, params);
    
    if (res.error) {
      Log.error(`Database query error: ${res.error.message}`);
      throw new Error(`Database query failed: ${res.error.message}`);
    }

    return res;
  }
}

module.exports = DB;