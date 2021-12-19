const puppeteer = require("puppeteer");
const device_width = 1920;
const device_height = 1080;

(async () => {
  const browser = await puppeteer.launch({
    //    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: device_width, height: device_height });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );
  await page.goto("http://pwc.pl");

  const acceptCookiesSelector = 'button[class="optanon-allow-all accept-cookies-button"]';
  await page.waitForSelector(acceptCookiesSelector);
  await page.click(acceptCookiesSelector);
  await page.waitFor(1000);
  await page.screenshot({ path: "screenshot.png", fullPage: true  });
  await browser.close();
})();
