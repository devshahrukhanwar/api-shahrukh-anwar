const { DB, Log } = require('../utility');

class Contact {

  static TABLE = 'contacts';

  /**
   * Create a new contact
   * @param {Object} param0 - The contact details
   * @param {string} param0.name - The name of the person creating the contact
   * @param {string} param0.email - The email of the person creating the contact
   * @param {string} param0.message - The message content of the contact
   * @returns {Promise<Object>} Returns the created contact
   */
  static async create({ name, email, message }) {
    const result = await DB.query(
      `INSERT INTO ${Contact.TABLE} (name, email, message) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, message]
    );

    if (result.error) {
      Log.error(`Error creating contact: ${result.error.message}`);
      throw new Error(`Failed to create contact: ${result.error.message}`);
    }

    Log.info(`Contact created successfully: ${result[0].id}`);

    return result[0];
  }

  /**
   * Get all contacts
   * @returns {Promise<Array>} Returns all contacts ordered by creation date
   */
  static async all() {
    const result = await DB.query(`SELECT * FROM ${Contact.TABLE} ORDER BY created_at DESC`);

    if (result.error) {
      Log.error(`Error fetching contacts: ${result.error.message}`);
      throw new Error(`Failed to fetch contacts: ${result.error.message}`);
    }

    Log.info(`Fetched ${result.length} contacts successfully`);

    return result;
  }
}

module.exports = Contact;