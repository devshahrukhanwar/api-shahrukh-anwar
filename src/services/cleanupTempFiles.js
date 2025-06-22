const fs = require('fs');
const path = require('path');

function cleanupTempFiles(dir, maxAgeDays = 7) {
  if (!fs.existsSync(dir)) return;
  const now = Date.now();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    try {
      const stats = fs.statSync(filePath);
      if (now - stats.mtimeMs > maxAgeMs) {
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      // Ignore errors
    }
  });
}

module.exports = { cleanupTempFiles };
