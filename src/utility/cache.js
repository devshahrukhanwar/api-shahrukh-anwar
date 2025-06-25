const fs = require('fs');
const path = require('path');

class Cache {

  static TEMP_DIR = process.env.VERCEL ? '/tmp' : path.join(__dirname, '../mocks/temp');

  // Get an item from the cache (file-based)
  static get(key) {
    const tempFile = getTempFile(key);

    if (fs.existsSync(tempFile)) {
      const cached = fs.readFileSync(tempFile, 'utf-8');
      return JSON.parse(cached);
    }

    return null;
  }

  // Set an item in the cache (file-based)
  static set(key, value) {
    if (!fs.existsSync(Cache.TEMP_DIR)) {
      fs.mkdirSync(Cache.TEMP_DIR, { recursive: true });
    }

    const tempFile = getTempFile(key);
    fs.writeFileSync(tempFile, JSON.stringify(value, null, 2), 'utf-8');
  }

  // Check if an item exists in the cache (file-based)
  static has(key) {
    const tempFile = getTempFile(key);

    return fs.existsSync(tempFile);
  }

  // Clear the cache (delete all temp files for today)
  static clear() {
    if (!fs.existsSync(Cache.TEMP_DIR)) return;

    fs.readdirSync(Cache.TEMP_DIR).forEach(file => {
      fs.unlinkSync(path.join(Cache.TEMP_DIR, file));
    });
  }
}

/**
 * Get the temporary file path.
 * @param {*} key 
 * @returns {string} The temporary file path.
 */
function getTempFile(key) {
  const today = new Date().toISOString().slice(0, 10);
  
  return path.join(Cache.TEMP_DIR, `${today}-${key}.json`);
}

module.exports = Cache;