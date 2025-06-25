const { Cache, Response } = require("../utility");

class UtilityController {
  static async clearCache(_, res) {
    try {
      await Cache.clear();
      res.status(200).json(Response.success("All Cache cleared from the system"));
    } catch (error) {
      res.status(500).json(Response.error("Failed to clear cache", error.message));
    }
  }
}

module.exports = { UtilityController };