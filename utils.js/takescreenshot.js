const puppeteer = require("puppeteer");
const crypto = require("crypto");

async function takeScreenShot({ urlString }) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  
  const page = await browser.newPage();

  const options = {
    path: `public/images/screenshoot-${crypto
      .randomBytes(4)
      .toString("hex")}.jpg`,
    fullPage: true,
    omitBackground: true,
  };

  await page.goto(urlString);
  await page.screenshot(options);

  await browser.close();
  return options.path.split("public/").pop();
}

module.exports = takeScreenShot;
