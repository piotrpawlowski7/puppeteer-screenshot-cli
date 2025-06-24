#!/usr/bin/env node --no-warnings

var argv = require('minimist')(process.argv.slice(2));
if (argv.link==null) {
link="http://pwc.pl/techminds";
} else {
link=argv.link;
}

const puppeteer = require("puppeteer");
const device_width = 1920;
const device_height = 1080;


const rand=Math.floor((Math.random() * 100) + 1);
(async () => {
  const start = console.log(`I'm going to take screenshot of this page: ${link}`);
  const browser = await puppeteer.launch({
    //    headless: false,
    devtools: false,
    args: ['--no-sandbox', '--incognito']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: device_width, height: device_height });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );
  await page.goto(link);
//click cookie button
  const acceptCookiesSelector = 'button[class="optanon-allow-all accept-cookies-button"]';
  await page.waitForSelector(acceptCookiesSelector);
  await page.click(acceptCookiesSelector);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot_'+ rand+'.png', fullPage: true  });
  await browser.close();
  console.log( "Screenshot done!" );

})();
