const path = require('path');
const { cleanupTempFiles } = require('./cleanupTempFiles');

// Run cleanup every 12 hours
setInterval(() => {
  const tempDir = path.join(__dirname, '../mocks/temp');
  cleanupTempFiles(tempDir, 7);
}, 12 * 60 * 60 * 1000); // 12 hours

// Also run once on startup
cleanupTempFiles(path.join(__dirname, '../mocks/temp'), 7);
