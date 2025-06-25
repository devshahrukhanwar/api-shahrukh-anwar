class Response {
  /**
   * Generates a standardized success response.
   * @param {string} message - The success message to include in the response.
   * @param {any} [data] - Optional additional data to include in the response.
   * @returns {Object} A standardized success response object.
   */
  static success(message, data) {
    const response = {
      success: true,
      message
    };

    if (data !== undefined) {
      response.data = data;
    }

    return response;
  }

  /**
   * Generates a standardized error response.
   * @param {string} message - The error message to include in the response.
   * @param {any} [data] - Optional additional data to include in the response.
   * @returns {Object} A standardized error response object.
   */
  static error(message, data) {
    const response = {
      success: false,
      message,
    };
    if (data !== undefined) {
      response.data = data;
    }
    return response;
  }
}

module.exports = Response;