const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { Log, Response } = require("../utility");

const tempDir = process.env.VERCEL ? '/tmp' : path.resolve(__dirname, '../mocks/temp');

class PuppeteerController {
  /**
   * Generate banners using Puppeteer
   * @param {*} req 
   * @param {*} res 
   */
  static async generateBanners(req, res) {
    try {
      const { name, url } = req.body;

      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

      const filePath = await PuppeteerController.captureScreenshot(name, url);

      Log.info("Banners generated successfully", { name, url, filePath });
      return res.status(200).json(Response.success("Banners generated successfully", { filePath }));
    } catch (error) {
      Log.error("Failed to generate banners", error);
      return res.status(500).json(Response.error("Failed to generate banners", error));
    }
  }

  /**
   * Capture a screenshot of a webpage
   * @param {*} name 
   * @param {*} url 
   * @returns 
   */
  static async captureScreenshot(name, url) {
    try {
      const filePath = path.join(tempDir, `${name}.png`);
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();

      // 4K resolution with 2x scale for Retina quality
      await page.setViewport({
        width: 1280,
        height: 800,
        deviceScaleFactor: 2,
      });

      await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
      await page.screenshot({ path: filePath, fullPage: false });
      await browser.close();

      return filePath;
    }
    catch (error) {
      Log.error("Error capturing screenshot", error);
      throw new Error("Failed to capture screenshot");
    }
  };
}

module.exports = { PuppeteerController };
