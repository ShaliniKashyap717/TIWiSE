const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const takeScreenshot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate directly to the capture route
  await page.goto('http://localhost:8080/dashboard', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  // Wait for and capture the target element
  await page.waitForSelector('#newsletter-capture-target', { timeout: 30000 });
  const element = await page.$('#newsletter-capture-target');
  
  // Ensure screenshots directory exists
  const screenshotDir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  
  const screenshotPath = path.join(screenshotDir, 'newsletter.png');
  await element.screenshot({
    path: screenshotPath,
    type: 'png',
    omitBackground: true
  });

  await browser.close();
  return screenshotPath;
};
module.exports = { takeScreenshot };