const { Cache, Log, Response } = require("../utility");

class UtilityController {
  static async clearCache(_, res) {
    try {
      await Cache.clear();
      Log.info("All cache cleared from the system");
      return res.status(200).json(Response.success("All cache cleared from the system"));
    } catch (error) {
      Log.error("Failed to clear cache", error);
      return res.status(500).json(Response.error("Failed to clear cache", error.message));
    }
  }
}

module.exports = { UtilityController };