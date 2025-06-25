/**
 * Render a Pug template to HTML string.
 * @param {Express.Application} app - The Express app instance.
 * @param {string} templatePath - Path to the Pug template (relative to views, no extension).
 * @param {object} data - Data to pass to the template.
 * @returns {Promise<string>} Rendered HTML string.
 */
async function getHTML(app, templatePath, data) {
  return new Promise((resolve, reject) => {
    app.render(templatePath, data, (err, html) => {
      if (err) return reject(err);
      resolve(html);
    });
  });
}

module.exports = { getHTML };
