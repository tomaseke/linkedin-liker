const puppeteer = require("puppeteer");
require("dotenv").config();
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://linkedin.com");
  await page.click(
    'a[data-tracking-control-name="guest_homepage-basic_nav-header-signin"]'
  );
  await page.type("#username", "tomasekerbenu@gmail.com");
  await page.type("#password", process.env.password);
  await page.click("button[type=submit]");
  await page.waitForTimeout(6000);
  await page.click(".search-global-typeahead__collapsed-search-button-icon");
  await page.type(".search-global-typeahead__input", 'decisionrules.io');
  await page.focus(".search-global-typeahead__collapsed-search-button-icon");
  await page.waitForTimeout(6000);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(10000);
  await page.click(".image-text-lockup__text");
  await page.waitForTimeout(6000);
  await page.click('a[href="/company/decisionrules-io/posts/"]');
  // await browser.close();
})();
